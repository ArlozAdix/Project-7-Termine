import OneCard from '../components/OneCard'

function OnePost() {
    
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return (
        <OneCard id={id}/>
    )
}

export default OnePost