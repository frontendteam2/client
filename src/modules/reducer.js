

const items =  [] 

export default function reducer(state = items, action) {
  if (action.type === 'content') {
    return [...state,{ category : action.title}]
  }
  else if (action.type === 'image') {
    return [...state,{category : '이미지'}]
  } else if (action.type === 'address') {
    return  [...state,{category : '주소'}]
  } else if (action.type === 'close') {
    return state.filter((v,i)=> i !== action.num )
  }

  return state
}