$( document ).ready(function() {
  
  $("#getName").click(function(event){
    event.preventDefault();
    ajaxGet();
  });
  
  function ajaxGet(){
	
	var	gNumber = $("#getNum").val();
		
    $.ajax({
	type : "GET",
	url : window.location + "users/getUser",
      success: function(result){
        if(result.status == "Done"){
			if(gNumber.trim()==""){
				result.status = "Failed";
				$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
				"you have to put a number to search a name </p>")
			}else{
			result.status = "Failed";
			$.each(result.data, function(i,user){
				if(user.number == gNumber){
					console.log(user.name);
					$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
					"name: " + user.name + "<br>phone number: "+ user.number + "</p>")
					result.status = "Done"
					return false;
					}
			})
			if(result.status == "Failed")
			$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
				"number dont exist in system therefore user dont exist </p>")
			}
          console.log("Success: ", result);
		
        }else if(result.status == "Failed"){
				$("resultModal").html("<p style=padding:20px 20px 20px 20px'>" +
				result.status + "</p>")
          console.log("Fail: ", result);
        }
      },
	error : function(e) {
        $("#resultModal").html("<strong>Error</strong>");
        console.log("ERROR: ", e);
      }
    });  
	resetData();
  }

 function resetData(){
      $("#getNum").val("");
}
})