const ClientsModel = require("../models/clients");

module.exports = {
  listClients: async () => {
    try {
      return ClientsModel.find();
      // return postsFetched.map((post) => {
      //   return {
      //     ...post._doc,
      //     _id: post.id,
      //     createdAt: new Date(post._doc.createdAt).toISOString(),
      //   };
      // });
    } catch (error) {
      throw error;
    }
  },

  getClient: async (_id) => {
    try {
      return ClientsModel.findById(_id);
    } catch (error) {
      throw error;
    }
  },

  createClient: async (args) => {
    try {
      const { name, email, phone } = args;
      return ClientsModel.create({ name, email, phone });
    } catch (error) {
      throw error;
    }
  },

  deleteClient: async (id) => {
    try {
      return ClientsModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },

  updateClient: async (args) => {
    try {
      const { _id, body } = args;
      const updated = await ClientsModel.findByIdAndUpdate(_id, { body: body });
      return `Post ${updated.id} updated Successfully!!!`;
    } catch (error) {
      throw error;
    }
  },
};
