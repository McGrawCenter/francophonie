---
layout: twocol
title: Chercher dans le lexique
---

<form id="search-form">
<p><input type="text" id="s" name="s" style="display:inline;margin-top: 20px;width:60%;" placeholder=""/> 
<input type='submit' id="search_go" class="btn" value='Chercher'/></p>
</form>

<div id="results-meta"><span id="hits"></span></div>

<ul id="search-results"></ul><!-- /search-results -->

<div id="pagination"></div>



<script>
  var expressions = {{ site.data.expressions | jsonify }};
</script>

<script src="assets/js/lunr.min.js"></script>
<script src="assets/js/search.js"></script>


