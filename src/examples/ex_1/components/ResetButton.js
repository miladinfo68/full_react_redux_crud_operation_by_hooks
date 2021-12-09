import {resetCount} from '../actions/index';
import {useDispatch} from 'react-redux';

const ResetButton = () => {
  const dispatch = useDispatch()
  return (    
      <button 
      style={{width:'4rem'}} 
      className="btn btn-warning" 
      id="resetBtn" 
      onClick={() => dispatch(resetCount())}
      >Reset</button>
  )
}

export default ResetButton