
    
    jQuery(document).ready(function(){
 
	jQuery( "#lookup" ).autocomplete({ 
	   focus: function(event, ui) {
		// prevent autocomplete from updating the textbox
		event.preventDefault();
		// manually update the textbox
		$(this).val(ui.item.label);
	   },
	   select: function (event, ui) {
		// prevent autocomplete from updating the textbox
		event.preventDefault();
		// manually update the textbox and hidden field
		$(this).val(ui.item.label);
		jQuery('#target_id').val(ui.item.value);
            },
	   source: u
	});    
    
    });



