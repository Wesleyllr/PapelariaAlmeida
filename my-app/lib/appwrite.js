import { router } from "expo-router";
import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.moovcolum.almeidaapp",
  projectId: "673e3a150016a2b9627d",
  databaseId: "673e3db1001e2c0dc837",
  userCollectionId: "673e3dee0006107ea9e6",
  videoCollectionId: "673e3e3200172eaf12c1",
  produtosCollectionId: "6748b56e0025fa373dd9",
  produtosvendidosCollectionId: "674a8c3b003a63a2b57f",
  storageId: "673e404800323e43c8ab",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  produtosCollectionId,
  videoCollectionId,
  produtosvendidosCollectionId,
  storageId,
} = config;

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw Error;
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      return null;
    }

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) {
      return null;
    }

    return currentUser.documents[0];
  } catch (error) {
    router.replace("/sign-in");
    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      produtosCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Tipo de arquivo inválido");
    }
    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return null;

  const asset = {
    name: file.name,
    type: file.mimeType,
    size: file.size,
    uri: file.uri,
  };

  try {
    console.log("Iniciando upload do arquivo...");
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );
    console.log("Arquivo carregado com sucesso:", uploadedFile);
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    console.log("URL do arquivo:", fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserProducts = async (userId) => {
  try {
    const produtos = await databases.listDocuments(
      databaseId,
      produtosCollectionId,
      [Query.equal("creator", userId)]
    );

    return produtos.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const createProduto = async (form) => {
  try {
    const capaUrl = form.capa ? await uploadImage(form.capa, "image") : null;

    const newProduto = await databases.createDocument(
      databaseId,
      produtosCollectionId,
      ID.unique(),
      {
        title: form.title,
        capa: capaUrl,
        valor: form.valor,
        creator: form.userId,
        colorback: form.colorback,
      }
    );

    return newProduto;
  } catch (error) {
    throw new Error(`Erro ao criar produto: ${error.message}`);
  }
};

export const uploadImage = async (file, type) => {
  if (!file) return null;

  const asset = {
    name: file.name,
    type: file.mimeType,
    size: file.size,
    uri: file.uri,
  };

  try {
    const uploadedImage = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );
    const imageUrl = await getFilePreview(uploadedImage.$id, type);
    return imageUrl;
  } catch (error) {
    throw new Error(`Erro ao fazer upload da imagem: ${error.message}`);
  }
};

export const registrarVenda = async (produto, pedidoId) => {
  try {
    const response = await databases.createDocument(
      databaseId, // Substitua pelo ID do banco de dados
      produtosvendidosCollectionId, // Substitua pelo ID da coleção
      ID.unique(), // Gera um ID único para o registro
      {
        produtoId: produto.id,
        nomeproduto: produto.nome,
        quantidade: produto.quantidade,
        valor: produto.preco,
        valortotal: produto.quantidade * produto.preco,
        datavenda: new Date().toISOString(),
        vendedorId: produto.userId, // Substitua pelo ID do usuário autenticado
        pedidoId: pedidoId,
      }
    );
  } catch (error) {
    console.error("Erro ao registrar venda:", error);
  }
};

export const getAllProdutosVendidos = async (userId) => {
  try {
    // Obtenha todos os documentos da coleção de produtos vendidos
    const produtosVendidos = await databases.listDocuments(
      databaseId,
      produtosvendidosCollectionId,
      [Query.equal("vendedorId", userId)]
    );

    // Log os dados no console

    // Retorne os produtos vendidos, se necessário
    return produtosVendidos.documents;
  } catch (error) {
    console.error("Erro ao obter produtos vendidos:", error);
  }
};
