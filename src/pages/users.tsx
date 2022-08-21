import { trpc } from '../utils/trpc';

const Profile = (props: any) => {
  const { data, isLoading } = trpc.useQuery(['getUsers']);
  if (isLoading || !data) return <div>loading...</div>;
  return (
    <table>
      <tr>
        {Object.keys(data[0] ?? {}).map((key) => (
          <th key={key}>{key}</th>
        ))}
      </tr>
      {data.map((user, i) => (
        <tr key={i}>
          {Object.values(user).map((val, i) => (
            <td className="px-2" key={i}>
              {JSON.stringify(val).replaceAll('"', '')}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default Profile;
