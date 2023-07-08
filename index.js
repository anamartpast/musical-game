const notes = {
    corchea: {
        image: 'images/corchea.jpg',
        time: 5
    },
    negrita: {
        image: 'images/negrita.jpg', 
        time: 10
    },
    blanca: {
        image: 'images/blanca.webp', 
        time: 20
    },
    redonda: {
        image: 'images/redonda.jpg', 
        time: 40
    }
};

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }







