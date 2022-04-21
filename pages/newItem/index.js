import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/Mongo/meetups/NewMeetupForm';

 function NewItemPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {

    const response = await fetch('/api/mongo', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);

    //router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}

export default NewItemPage;