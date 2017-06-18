export const calculareAction = (obj, currentUserId) => {
    let value = obj.action === undefined ? parseInt(obj.value, 10) : ( (parseInt(obj.value, 10) + parseInt(obj.action, 10) ) / 3);
    let winner = (value === 1 && obj.action !== undefined) ? currentUserId : "";


    return {
      value,
      player : currentUserId,
      action : obj.action,
      winner
    }
}

export const computerAction = (userAction) => {

  let action = 0;

  if ((userAction.value + 1) % 3 === 0)
  {
    action = 1;
  } else if ((userAction.value - 1) % 3 === 0)
  {
    action = -1;
  } 

  return {
    value : userAction.value,
    action
  }

}