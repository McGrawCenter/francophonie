$(document).ready(function(){


	// init graph data

	var meanings = {}
	var nodes = []
	var links = []
	var cnt = 0;

	jQuery.each(expressions, function(i,v){
	  var node = { "id": v.ID,"name":v.Expression,"val":5 }
	  
	  if(meanings[v.Equivalent] ==  null) { meanings[v.Equivalent]  = [v.ID]; }
	  else { meanings[v.Equivalent].push(v.ID); }
	  
	  nodes.push(node);
	  cnt = parseInt(v.ID);
	});
	
	for(x in meanings) {

	  var node = { "id": cnt,"name":x,"val":5 }
	  nodes.push(node);

	  targets = meanings[x];
	  
	  for(t in targets) {
	    var link = {"source":cnt,"target":targets[t] }
	    links.push(link);
	  }
	  cnt+=1;
	}

	var data = {"nodes":nodes,"links":links}
	
	//end init graph data
	
	
	var width = jQuery(".twelve").width();
	var height = 700;
	
	
	const Graph = ForceGraph3D()
	   (document.getElementById('graph')).graphData(data)
	     .width(width)
	     .height(height)		     
	     .nodeColor(d => '#333')
	     .linkColor(d => '#555')
	     .linkWidth(3)
	     .backgroundColor('#EEE')
	     .onNodeClick(jumptonode)
	     .nodeThreeObject(node => {
		  const sprite = new SpriteText(node.name);
		  sprite.material.depthWrite = false; // make sprite background transparent
		  sprite.color = '#000';
		  sprite.textHeight = 18;
		  return sprite;
		});
		
	
	function jumptonode(node) {
	  console.log(node);
	}
	
	
	
	
	
});
