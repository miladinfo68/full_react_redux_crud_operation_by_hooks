import {increaseCount, decreaseCount} from '../actions/index';
import {useSelector, useDispatch} from 'react-redux';

const SwitchersButtons = () => {

  const {counter} = useSelector(state => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <button style={{width:'4rem'}} className="btn btn-danger"  id="minusBtn" onClick={() => dispatch(decreaseCount(counter))}>-</button>
      <button style={{width:'4rem'}} className="btn btn-success mx-3"  id="plusBtn" onClick={() => dispatch(increaseCount(counter))}>+</button>
    </>
  )
}

export default SwitchersButtons