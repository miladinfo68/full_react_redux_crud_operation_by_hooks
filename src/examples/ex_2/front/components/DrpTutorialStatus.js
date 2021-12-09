
const DrpTutorialStatus = (props) => {
    const data = ["Choosen...", "Published", "Pendding"];

    return (
        <select
            id={props.id}
            name={props.id}
            value={props.selected}
            className="form-select formInput"
            onChange={props.change}>

            {data.map((v, k) => <option key={k} value={k}> {v} </option>)}
        </select>
    )
}

export default DrpTutorialStatus;
