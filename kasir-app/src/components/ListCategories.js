import React, { Component } from "react";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheese,
  faCoffee,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory } = this.props;

    return (
      <div className="pr-3">
        {categories.map((category, index) => (
          <button
            key={index}
            className=" text-center border-2 xl:py-3 py-2 w-full mb-3 rounded-lg shadow-md hover:scale-105 transition hover:bg-red-400 hover:text-white origin-center cursor-pointer active:bg-red-600 focus:bg-red-400 focus:text-white"
            onClick={() => changeCategory(category.nama)}
          >
            <h3 className="text-sm xl:text-base">
              <span className="mr-3">
                <Icon nama={category.nama} />
              </span>
              {category.nama}
            </h3>
          </button>
        ))}
      </div>
    );
  }
}

// export const ListCategories = () => {
//   const [category, setCategory] = useState([]);

//   const tampilKategori = async () => {
//     try {
//       const response = await fetch(API_URL + "categories");
//       const data = await response.json();
//       setCategory(data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   useEffect(() => {
//     tampilKategori();
//   }, []);

//   console.log(category);

//   return (

//   );
// };
