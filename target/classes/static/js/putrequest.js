$(document).ready(function(){
	
	$("#update").submit(function(event){
		event.preventDefault();
		ajaxUpdate();
	});
	
	function ajaxUpdate(){
		
		var up = {
			name: $("#upName").val(),
			number: $("#upNum").val()
		}	
			
		if(up.name == "" || up.number==""){
			$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
				"you have to put a number you want to update and new name to update to</p>")
		}else{				
		$.ajax({
			type: "PUT",
			url : window.location + "users/update/" + up.name + "/" + up.number,
			success: function(result){
      		  if(result.status == "Done"){
				$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
				"the user with the number of " + up.number + " updated name to " + result.data + "</p>")
          console.log("Success: ", result);
		
      		  }else if(result.status == "Failed"){
				$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
					"phone number dont exist therefore user dont exist in system </p>")
       		   console.log("Fail: ", result);
			
      	  }
      },
		error : function(e) {
        $("#resultModal").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
	}
	resetData();
  }

 function resetData(){
      $("#upNum").val("");
      $("#upName").val("");

}
	
})