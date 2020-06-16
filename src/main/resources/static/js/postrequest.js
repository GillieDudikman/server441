$( document ).ready(function() {
  
    $("#addUser").submit(function(event) {
    event.preventDefault();
    ajaxPost();
  });
    
    
    function ajaxPost(){
      
      var userDits = {
        name : $("#name").val(),
        number :  $("#number").val()
      }

      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location + "users/save",
      data : JSON.stringify(userDits),
      dataType : 'json',
      success : function(result) {
        if(result.status == "Done"){
          $("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" + 
                         "A new user added "+ 
                        result.data.name + ", " + result.data.number + "</p>");
        }else if(result.status == "Exist"){
          $("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" + 
                         "Number already exist in system</p>");
		}else if(result.status == "Failed"){
          $("#resultModal").html("<p  style=padding:20px 20px 20px 20px'>" + 
                         "You need to enter 10 digits of number and a name</p>");
       	 }else{
				$("#resultModal").html("<p style=padding:20px 20px 20px 20px'>" + 
                        result.status + "</p>");
			}
        console.log(result);
      },
      error : function(e) {
        alert("Error!")
        console.log("ERROR: ", e);
      }
    });
    resetData();
 
    }
    
    function resetData(){
      $("#name").val("");
      $("#number").val("");
    }
})