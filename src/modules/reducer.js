import Question from '../components/content/Content';


const items =  [] 

export default function reducer(state = items, action) {
  if (action.type === 'content') {
    return [...state,{type :action.type,title : action.title}]
    // return { key: state.key + 1, question: [...state.question, <Question key={state.key} num={state.key} txt={action.title} />] }
  }
  else if (action.type === 'image') {
    console.log(action.type);
    return state
  } else if (action.type === 'address') {
    console.log(action.type);
    return state
  } else if (action.type === 'close') {
    console.log(action,state);
    // const updatedQuestions = [...state];
    // updatedQuestions.splice(action.num, 1);
    return state.filter((v,i)=> i !== action.num )
  }

  return state
}