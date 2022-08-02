import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/client.mutation";
import { FETCH_CLIENTS } from "../queries/client.queries";

export default function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient, { loading, error }] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    refetchQueries: [{ query: FETCH_CLIENTS }],
    // update(cache, { data: { addClient } }) {
    //   const { listClients } = cache.readQuery({ query: FETCH_CLIENTS });

    //   cache.writeQuery({
    //     query: FETCH_CLIENTS,
    //     data: { clients: [...listClients, addClient] },
    //   });
    // },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }

    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" /> &nbsp;
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
