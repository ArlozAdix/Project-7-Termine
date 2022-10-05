import Edit from "../components/Edit";

function EditPage() {
    
    let params = (new URL(document.location)).searchParams;
    let id = params.get('id');
    return (
        <Edit id={id}/>
    )


};

export default EditPage