$(document).ready(function(){
	
	$("#delete").submit(function(event){
		event.preventDefault();
		ajaxDelete();
	});
	
	function ajaxDelete(){
		var nUser = $("#delNum").val();
		
		if(nUser == ""){
			$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
				"you have to put a number you want to delete</p>")
		}else{				
		$.ajax({
			type: "DELETE",
			url : window.location + "users/delete/" + nUser,
			success: function(result){
      		  if(result.status == "Done"){
				$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
				"the user with the number of " + nUser + " deleted from system</p>")
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
      $("#delNum").val("");
}
	
})