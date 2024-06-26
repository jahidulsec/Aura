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
  platform: "com.jahidulsec.aura",
  projectId: "66210d7f9cdf6dc188a8",
  databaseId: "66211ed0a0b6470131e3",
  userCollectionId: "66211f11db38dc243899",
  videoCollectionId: "66211f35e61bc10a45e4",
  bookmarkCollectionId: "6623ec9d87ba63db7609",
  storageId: "6621203599d7fd10b707",
};

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storages = new Storage(client);

export const createUser = async ({ email, password, username }) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await SignIn({ email, password });

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt")],
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))],
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)],
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("users", userId)],
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserSavedPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.bookmarkCollectionId,
      [Query.equal("users", userId)],
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
      fileUrl = storages.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storages.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100,
      );
    }

    if (!fileUrl) {
      throw Error;
    }

    return fileUrl;
  } catch (error) {
    throw new Error("Invalid file type");
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.filesize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storages.createFile(
      config.storageId,
      ID.unique(),
      asset,
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createVideo = async (form) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        users: form.userId,
      },
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const addToBookmark = async (userId, card) => {
  try {
    const response = await databases.createDocument(
      config.databaseId,
      config.bookmarkCollectionId,
      ID.unique(),
      {
        title: card.title,
        thumbnail: card.thumbnail,
        video: card.video,
        users: userId,
      },
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeBookmark = async (bookmarkId) => {
  try {
    const respone = await databases.deleteDocument(
      config.databaseId,
      config.bookmarkCollectionId,
      bookmarkId,
    );

    return respone;
  } catch (error) {
    throw new Error(error);
  }
};
