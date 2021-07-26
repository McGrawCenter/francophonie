jQuery(document).ready(function(){

	
	/********************* rotating banner *******************/


	var current = 0;
	var images = [
  	   {"img":"assets/images/banners/banner02.jpg","attr":""},
  	   {"img":"assets/images/banners/cote-divoire.jpg","attr":""},
  	   {"img":"assets/images/banners/ivory-coast.jpg","attr":""},
	   {"img":"assets/images/banners/banner03.jpg","attr":""},
	   {"img":"assets/images/banners/banner04.jpg","attr":""}];

	
	function rotate_banner() {

	  //jQuery("#banner").css('background-image', 'url(' + images[current].img + ')');
	  //jQuery("#header-attribution").html(images[current].attr);
	   
	  setTimeout(function() {
	     setBanner();
          }, 10000);

	}
	
	
	
	
	function setBanner() {
	
	    current++;
	    if(current >= images.length) { current = 0; }

	    if(images.length > 1) {
	
		jQuery('#banner').fadeTo(1000, 0, function()
		{
		    jQuery(this).css('background-image', 'url(' + images[current].img + ')');
		    jQuery("#banner-attribution").html(images[current].attr);
		}).fadeTo(1000, 1);

		
		setTimeout(function() {
		   setBanner(images);
	        }, 10000);
	        
	     } // end if more than one image
	}
	
	
	rotate_banner();


});
