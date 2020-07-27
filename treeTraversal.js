//http://bl.ocks.org/d3noob/8326869
//https://bl.ocks.org/mph006/7e7d7f629de75ada9af5 -> bfs, dfs
var margin = {top: 20, right: 0, bottom: 20, left: 0},
  width = document.getElementById("tree-container").offsetWidth - margin.right - margin.left,
  height = document.getElementById("tree-container").offsetHeight - margin.top - margin.bottom;

var i=0, animDuration=200,root;

var tree = d3.layout.tree()
  .size([height, width]);


// https://github.com/wbkd/d3-extended
d3.selection.prototype.moveToFront = function() {  
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

var svg = d3.select("#tree-container").append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
root= treeData[0];
update(treeData[0]);

function resetTraversal(root){
  d3.selectAll(".node")
    .transition().duration(animDuration)
    .style("fill","#fff")
    .style("stroke","steelblue");

}

function update(root) {

  resetTraversal(root);

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth *100; });

  // Declare and append the nodes
  var nodeWrapper = svg.append("g").attr("id","nodes").selectAll("g.node")
    .data(nodes, function(d) {return d.id || (d.id = ++i); })
    .enter().append("circle")
    .attr("class", "node")
    //Root is the highest ID
    .attr("id",function(d){return "node-"+d.id})
    .attr("cx",function(d){return d.x;})
    .attr("cy",function(d){return d.y;})
    .attr("r", 10);

  // Declare and append the links
  var linkWrapper = svg.append("g").attr("id","links").selectAll("path.link")
    .data(links, function(d) { return d.target.id; })
    .enter()
    .append("line", "g")
    .attr("class", "link")
    .attr("id",function(d){
      return d.source.id +"->"+ d.target.id;
    })
    .attr('x1', function(d){return d.source.x;})
    .attr('x2',function(d){return d.target.x;})
    .attr('y1',function(d){return d.source.y;})
    .attr('y2',function(d){return d.target.y;});

  //Styling consideration
  d3.select("#nodes").moveToFront();

}
function visitElement(element,animX){
 // d3.select("#node-"+element.id).classed("visited",true);
  d3.select("#node-"+element.id)
    .transition().duration(animDuration).delay(animDuration*animX)
    .style("fill","red").style("stroke","red");
}

function dft(){
  resetTraversal(root);
  var stack=[];
  var animX=0;
  stack.push(root);
  while(stack.length!==0){
    var element = stack.pop();
    visitElement(element,animX);
    animX=animX+1;
    if(element.children!==undefined){
      for(var i=0; i<element.children.length; i++){
        stack.push(element.children[element.children.length-i-1]);
      }
    }
  }
}

function bft(){
  resetTraversal(root);
  var queue=[];
  var animX=0;
  queue.push(root);
  while(queue.length!==0){
    var element = queue.shift();
    visitElement(element,animX);
    animX= animX+1;
    if(element.children!==undefined){
      for(var i=0; i<element.children.length; i++){
        queue.push(element.children[i]);
      }
    }
  }
}

function artPts(){
  resetTraversal(root);

}