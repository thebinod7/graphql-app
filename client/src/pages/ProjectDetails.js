import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/project.queries";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_PROJECT,
    {
      variables: { id },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => stopPolling();
  }, [startPolling, stopPolling]);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.getProject.name}</h1>
          <p>{data.getProject.description}</p>

          <h5 className="mt-3">getProject Status</h5>
          <p className="lead">{data.getProject.status}</p>

          <ClientInfo client={data.getProject.client} />
        </div>
      )}
    </>
  );
}
