import React from "react";
import { useQuery } from "@apollo/client";

import ClientRow from "../components/ClientRow";
import { FETCH_CLIENTS } from "../queries/client.queries";
import Spinner from "../components/Spinner";
import AddClientModal from "./AddClientModal";

export default function Clients() {
  const { loading, error, data } = useQuery(FETCH_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return "Something went wrong!";

  return (
    <div>
      <AddClientModal />
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.listClients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
