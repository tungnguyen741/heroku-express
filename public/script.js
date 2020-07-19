//  var loadingIcon = document.getElementById('loadingIcon');
//  var overlay = document.getElementById('overlay');
//  let loading = false;
//  if(!loading){
//      var node = document.createElement("img");
//      var att = document.createAttribute("src");
//      att.value = "./loading.gif" ;
//      loadingIcon.setAttributeNode(att);
//  }
//  axios.get('https://demo-express-codersx.herokuapp.com/api/books')
//      .then(value =>{ 
//          if(value.data)
//         {
//              var node = document.createElement("img");
//              var att = document.createAttribute("src");
//              att.value = "" ;
//              loadingIcon.setAttributeNode(att);
//              overlay.style.display="none";
//              return;
//          }
//  });