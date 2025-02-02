import '../Person/Person.css';

function Person({ person }) {
  if (!person) return null;

  return (
  <ul className="person-list">
  <li>First Name: {person.firstName}</li>
  <li>Last Name: {person.lastName}</li>
  <li>Email: {person.email}</li>
</ul>
  );
}

export default Person;
