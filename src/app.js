require('file-loader?name=[name].[ext]!./assets/images/favicon.ico')
const api = require('./neo4jApi');

$(function () {
  renderGraph();
  search();

  $("#search").submit(e => {
    e.preventDefault();
    search();
  });
});

function showMovie(title) {
  api
    .getMovie(title)
    .then(movie => {
      if (!movie) return;

      $("#title").text(movie.title);
      $("#poster").attr("src","https://neo4j-documentation.github.io/developer-resources/language-guides/assets/posters/"+encodeURIComponent(movie.title)+".jpg");
      const $list = $("#crew").empty();
      movie.cast.forEach(cast => {
        $list.append($("<li>" + cast.name + " " + cast.job + (cast.job === "acted" ? " as " + cast.role : "") + "</li>"));
      });
    }, "json");
}

function search() {
  const query = $("#search").find("input[name=search]").val();
  api
    .searchMovies(query)
    .then(movies => {
      const t = $("table#results tbody").empty();

      if (movies) {
        movies.forEach(movie => {
          $("<tr><td class='movie'>" + movie.title + "</td><td>" + movie.released + "</td><td>" + movie.tagline + "</td></tr>").appendTo(t)
            .click(function() {
              showMovie($(this).find("td.movie").text());
            })
        });

        const first = movies[0];
        if (first) {
          showMovie(first.title);
        }
      }
    });
}

function renderGraph() {
  const width = 800, height = 800;
  const force = d3.layout.force()
    .charge(-200).linkDistance(30).size([width, height]);

  const svg = d3.select("#graph").append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("pointer-events", "all");

  api
    .getGraph()
    .then(graph => {
      force.nodes(graph.nodes).links(graph.links).start();

      const link = svg.selectAll(".link")
        .data(graph.links).enter()
        .append("line").attr("class", "link");

      const node = svg.selectAll(".node")
        .data(graph.nodes).enter()
        .append("circle")
        .attr("class", d => {
          return "node " + d.label
        })
        .attr("r", 10)
        .call(force.drag);

      // html title attribute
      node.append("title")
        .text(d => {
          return d.title;
        });

      // force feed algo ticks
      force.on("tick", () => {
        link.attr("x1", d => {
          return d.source.x;
        }).attr("y1", d => {
          return d.source.y;
        }).attr("x2", d => {
          return d.target.x;
        }).attr("y2", d => {
          return d.target.y;
        });

        node.attr("cx", d => {
          return d.x;
        }).attr("cy", d => {
          return d.y;
        });
      });
    });
}
