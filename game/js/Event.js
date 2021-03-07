function keyboardDirection() {
  let key = {};
  key.direction = 0;
  //The `downHandler`
  key.downHandler = event => {
	  switch (event.key){
	  	case "w":
			key.direction = 1;
			event.preventDefault();
	  		break;
		case "s":
			key.direction = 2;
			event.preventDefault();
			break;
		case "a":
			key.direction = 3;
			event.preventDefault();
			break;
		case "d":
			key.direction = 4;
			event.preventDefault();
			break;
	  }
  };

  //The `upHandler`
  key.upHandler = event => {
	  switch (event.key){
	  	case "w":
			if(key.direction==1){
				key.direction = 0;
				event.preventDefault();
			}
		break;
		case "s":
			if(key.direction==2){
				key.direction = 0;
				event.preventDefault();
			}
			break;
		case "a":
			if(key.direction==3){
				key.direction = 0;
				event.preventDefault();
			}
			break;
		case "d":
			if(key.direction==4){
				key.direction = 0;
				event.preventDefault();
			}
			break;
	  }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  return key;
  }
  
  function keyboardFire(key) {
    key.fire = 0;
    //The `downHandler`
    key.downHandler = event => {
		if(event.code=='Space'){
			key.fire = 1;
			event.preventDefault();
		}
    };
  
    //The `upHandler`
    key.upHandler = event => {
  	  if(event.code=='Space'){
		  key.fire = 0;
		  event.preventDefault();
  	  }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    return key;
    }