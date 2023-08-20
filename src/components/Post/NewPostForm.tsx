import { Alert, Text, AlertIcon, Flex, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from "./TabItem";
import TextInputs from "./PostsForm/TextInputs";
import ImageUpload from "./PostsForm/ImageUpload";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/ClientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import useSelectFile from "../../hooks/useSelectFile";

type NewPostFormProps = {
  user: User;
  communityImageURL?: string;
};

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];
export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};
const NewPostForm: React.FC<NewPostFormProps> = ({
  user,
  communityImageURL,
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [selectedFile, setSelectedFile] = useState<string>();
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const handleCreatePost = async () => {
    const { communityId } = router.query;

    // const newPost: Post = {
    //   communityId: communityId as string,
    //   creatorId: user?.uid,
    //   creatorDisplayName: user?.email!.split("@")[0],
    //   title: textInputs.title,
    //   body: textInputs.body,
    //   voteStatus: 0,
    //   createdAt: serverTimestamp() as Timestamp,
    //   numberOfComments: 0,
    //   id: 0,
    //   // id: uuidv4(),
    // };
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId: communityId as string,
        creatorId: user?.uid,
        communityImageURL: communityImageURL || "",
        creatorDisplayName: user?.email!.split("@")[0],
        title: textInputs.title,
        body: textInputs.body,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
        numberOfComments: 0,
      });
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error: any) {
      console.log("handleCreatePost error", error.message);
      setError(true);
    }
    setLoading(false);
  };
  // const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();
  //   if (event.target.files?.[0]) {
  //     reader.readAsDataURL(event.target.files?.[0]);
  //   }

  //   reader.onload = (readerEvent) => {
  //     if (readerEvent.target?.result) {
  //       setSelectedFile(readerEvent.target.result as string);
  //     }
  //   };
  // };
  const onTextChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius={4} mt={2}>
      <Flex width="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex padding={4}>
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            selectedFile={selectedFile}
            onSelectedImage={onSelectFile}
            setSelectedTab={setSelectedTab}
            setSelectedFile={setSelectedFile}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}> Error creating post</Text>
        </Alert>
      )}
      ;
    </Flex>
  );
};
export default NewPostForm;
