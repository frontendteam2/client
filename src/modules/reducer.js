import Question from '../components/home/Content';


const items = { key: 1, question: [] }
export default function reducer(state = items, action) {
  if (action.type === 'add') {
      return { key: state.key + 1, question: [...state.question, <Question key={state.key} num={state.key} txt={action.title} />] }
  }
  else if(action.type === 'image'){
    console.log(action.type);
    return state
  }else if(action.type === 'address'){
    console.log(action.type);
    return state
  }

  return state
}