String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

$('#advanceprice').hide();
$('#advancelocation').hide();

$('#showprice').click(function() {
 $('#advanceprice').show("slow");
 $('.wrap').hide("slow");
 $('#showprice').hide("slow");
 $('#showlocation').hide("slow");
 $(".hidehae").hide("slow");
});

$('#showlocation').click(function() {
 $('#advancelocation').show("slow");
 $('.wrap').hide("slow");
 $('#showlocation').hide("slow");
 $('#showprice').hide("slow");
 $(".hidehae").hide("slow");
});

$('#hidelocation').click(function() {
 $('#advancelocation').hide("slow");
 $('.wrap').show("slow");
 $('#showprice').show("slow");
 $('#showlocation').show("slow");
 $(".hidehae").show("slow");
});

$('#hideprice').click(function() {
 $('#advanceprice').hide("slow");
 $('.wrap').show("slow");
 $('#showprice').show();
 $('#showlocation').show();
 $(".hidehae").show("slow");
});


$.ajax({
   type : "get",
   url : '/get/applications',
   contentType : "application/json",
   dataType : 'json',
   success : function(data){
     if(data.length==0)
     {
       $("#post").html("<div class='well text-center'>There is no live tournaments</div>");
     }
     else
     {
       for(var i = 0 ; i < data.length ; i++)
       {
          $("#post").append(
            "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
            "<div class='card'>"+
            "<img src="+data[i].sportimage+" class='img-responsive' style='width:100%;height:200px;'>"+
            "<h1 class='item'>"+data[i].sportname.capitalize()+"</h1>"+
            "<p class='list'>Host Name : "+data[i].hostname.capitalize()+"</p>"+
            "<p class='list'>Entry Fee : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].entryfee+"</p>"+
            "<p class='list'>Place : "+data[i].city+"</p>"+
            "<a href=/my/application/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Get details</button></p>"+
            "<hr>"+
            "</div>"+
            "</div>"
            );
      }
    }
  }    
});

$('.namesearch').click(function(){
   searchval = $('.search-term').val();
$.ajax({
   type : "get",
   url : '/get/application/search/name/'+searchval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length==0)
     {
       $("#post").html("");
       $("#post").html("<div class='well text-center'>Result not found</div>");
     }
     else
     {
       for(var i = 0 ; i < data.length ; i++)
       {
         $("#post").html("");
          $("#post").append(
            "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
            "<div class='card'>"+
            "<img src="+data[i].sportimage+" class='img-responsive' style='width:100%;height:200px;'>"+
            "<h1 class='item'>"+data[i].sportname.capitalize()+"</h1>"+
            "<p class='list'>Host Name : "+data[i].hostname.capitalize()+"</p>"+
            "<p class='list'>Entry Fee : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].entryfee+"</p>"+
            "<p class='list'>Place : "+data[i].city+"</p>"+
            "<a href=/my/application/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Get details</button></p>"+
            "<hr>"+
            "</div>"+
            "</div>"
            );
       }
     }
  }
});
});

$('.search-location').on('change',function(){
  locval = this.value;

$.ajax({
   type : "get",
   url : '/get/application/search/location/'+locval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length==0)
     {
       $("#post").html("");
       $("#post").html("<div class='well text-center'>Result not found</div>");
     }
     else
     {
       for(var i = 0 ; i < data.length ; i++)
       {
         $("#post").html("");
          $("#post").append(
            "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
            "<div class='card'>"+
            "<img src="+data[i].sportimage+" class='img-responsive' style='width:100%;height:200px;'>"+
            "<h1 class='item'>"+data[i].sportname.capitalize()+"</h1>"+
            "<p class='list'>Host Name : "+data[i].hostname.capitalize()+"</p>"+
            "<p class='list'>Entry Fee : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].entryfee+"</p>"+
            "<p class='list'>Place : "+data[i].city+"</p>"+
            "<a href=/my/application/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Get details</button></p>"+
            "<hr>"+
            "</div>"+
            "</div>"
            );
       }
     }
   }
});
});

$('.search-condition').on('change',function(){
  condval = this.value;
  condval = $(".search-condition").val();
  priceval = $(".search-price").val();
$.ajax({
   type : "get",
   url : '/get/application/search/entryfee/'+condval+'/'+priceval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length==0)
     {
       $("#post").html("");
       $("#post").html("<div class='well text-center'>Result not found</div>");
     }
     else
     {
       for(var i = 0 ; i < data.length ; i++)
       {
         $("#post").html("");
          $("#post").append(
            "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
            "<div class='card'>"+
            "<img src="+data[i].sportimage+" class='img-responsive' style='width:100%;height:200px;'>"+
            "<h1 class='item'>"+data[i].sportname.capitalize()+"</h1>"+
            "<p class='list'>Host Name : "+data[i].hostname.capitalize()+"</p>"+
            "<p class='list'>Entry Fee : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].entryfee+"</p>"+
            "<p class='list'>Place : "+data[i].city+"</p>"+
            "<a href=/my/application/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Get details</button></p>"+
            "<hr>"+
            "</div>"+
            "</div>"
            );
       }
     }
   }
});
});

$('.search-price').on('change',function(){
  priceval = this.value;

$.ajax({
   type : "get",
   url : '/get/application/search/entryfee/'+condval+'/'+priceval,
   contentType : "application/json",
   dataType : 'json',
   success : function(data,err){
     if(data.length==0)
     {
       $("#post").html("");
       $("#post").html("<div class='well text-center'>Result not found</div>");
     }
     else
     {
       for(var i = 0 ; i < data.length ; i++)
       {
         $("#post").html("");
          $("#post").append(
            "<div class='col-xs-6 col-lg-3 col-md-4 col-sm-6'"+
            "<div class='card'>"+
            "<img src="+data[i].sportimage+" class='img-responsive' style='width:100%;height:200px;'>"+
            "<h1 class='item'>"+data[i].sportname.capitalize()+"</h1>"+
            "<p class='list'>Host Name : "+data[i].hostname.capitalize()+"</p>"+
            "<p class='list'>Entry Fee : <i class='fa fa-inr' aria-hidden='true'></i>"+data[i].entryfee+"</p>"+
            "<p class='list'>Place : "+data[i].city+"</p>"+
            "<a href=/my/application/detail/"+data[i]._id+" id='newpage'><button id='more-details'>Get details</button></p>"+
            "<hr>"+
            "</div>"+
            "</div>"
            );
       }
     }
   }
});
});

$(".dropdown-toggle").click(function(){
  $(".dropdown-toggle").css("background", "#722872");
  $(".dropdown-menu").css("background", "#722872");
});
