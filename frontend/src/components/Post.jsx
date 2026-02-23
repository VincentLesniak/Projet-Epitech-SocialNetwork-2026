const Post = () => {
  return (
    <div>
      <div className="flex flex-row gap-4">
        <img src="https://placehold.co/50" alt="Photo de profil" />
        <p>Nom d'utilisateur</p>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure nemo odit
        distinctio. Hic odit officiis, laborum voluptas cum culpa asperiores
        eligendi iure accusantium quidem perspiciatis molestias tenetur, at
        magnam possimus.
      </p>
      <div className="flex flex-row justify-end gap-4">
        <button>
          <img src="https://placehold.co/20" alt="Like" />
        </button>
        <button>Commenter</button>
      </div>
    </div>
  );
};

export default Post;
