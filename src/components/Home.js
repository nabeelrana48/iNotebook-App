import Notes from './Notes';

export default function Home(props) {
  
  return (
    <div>
      <Notes showalert={props.showalert}/>
    </div>
  )
}
