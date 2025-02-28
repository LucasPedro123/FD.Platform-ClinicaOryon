import React, { useEffect, useRef, useState } from "react";
import * as S from "./Database.style";
import { useFoodContext } from "../../Context/Foods.context";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import { Food } from "../../Interfaces/web.interfaces";
import { toast } from "react-toastify";
import GenerateId from "../../utils/GenerateID.util";

Modal.setAppElement("#root");

export const Database: React.FC = () => {
  const {
    categories,
    fetchCategories,
    searchTerm,
    setSearchTerm,
    fetchFoodItems,
    updateFoodItem,
    deleteFoodItem,
    addFoodItem,
    foodItems,
  } = useFoodContext();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [newFood, setNewFood] = useState({
    id: 0,
    name: "",
    portion: "",
    calories: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [optionsIsOpen, setOptionsIsOpen] = useState<number | null>(null);
  const [filteredFoodItems, setFilteredFoodItems] = useState<Food[]>(foodItems);
  const [bulkDeleteModalIsOpen, setBulkDeleteModalIsOpen] =
    useState<boolean>(false);

  useEffect(() => {
    fetchCategories();
  });

  useEffect(() => {
    fetchFoodItems(selectedCategory);
  }, [selectedCategory]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchFoodItems(selectedCategory);
    }
  };

  const handleEditFood = async () => {
    setLoading(true);
    if (!selectedFood || !selectedFood.id) return;
    console.log("EDIT ", newFood);
    try {
      const updatedFood = {
        ...selectedFood,
        name: newFood.name,
        portion: newFood.portion,
        calories: Number(newFood.calories),
      };
      updateFoodItem(selectedCategory, updatedFood);
      setEditModalIsOpen(false);
    } catch (error) {
      console.error("Error updating food item: ", error);
      toast.error("Error updating food item.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFood = async () => {
    setLoading(true);
    if (!selectedFood || !selectedFood.id) return;
    try {
      const deletedFood = {
        ...selectedFood,
        name: newFood.name,
        portion: newFood.portion,
        calories: Number(newFood.calories),
      };
      deleteFoodItem(selectedCategory, deletedFood.id);
      setDeleteModalIsOpen(false);
    } catch (error) {
      console.error("Error updating food item: ", error);
      toast.error("Error updating food item.");
    } finally {
      setLoading(false);
    }
  };
  const handleAddedFood = async () => {
    setLoading(true);
    if (!selectedFood || !selectedFood.id) {
      const addedFood: Food = {
        id: GenerateId(),
        name: newFood.name,
        portion: newFood.portion,
        calories: Number(newFood.calories),
      };
      addFoodItem(selectedCategory, addedFood);
      setModalIsOpen(false);
    }
    try {
      const addedFood = {
        id: GenerateId(),
        name: newFood.name,
        portion: newFood.portion,
        calories: Number(newFood.calories),
      };
      addFoodItem(selectedCategory, addedFood);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error updating food item: ", error);
      toast.error("Error updating food item.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionsClick = (index: number) => {
    setOptionsIsOpen(optionsIsOpen === index ? null : index);
  };

  const openEditModal = (food: Food) => {
    setSelectedFood(food);
    setNewFood({
      id: food.id,
      name: food.name,
      portion: food.portion,
      calories: food.calories,
    });
    setEditModalIsOpen(true);
  };

  const openDeleteModal = (food: Food) => {
    setSelectedFood(food);
    setDeleteModalIsOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setOptionsIsOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [foodItems]);

  useEffect(() => {
    const filteredData = foodItems.filter((item) => {
      const name = item?.name || ""; // Garante que `name` nunca será undefined
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredFoodItems(filteredData);
  }, [searchTerm, foodItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleBulkDelete = () => {
    setBulkDeleteModalIsOpen(true);
  };

  const confirmBulkDelete = async () => {
    try {
      await Promise.all(
        selectedItems.map((id) => deleteFoodItem(selectedCategory, id))
      );
      setSelectedItems([]);
      setBulkDeleteModalIsOpen(false);
      toast.success("Alimentos excluídos com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir alimentos.");
      console.error("Erro ao excluir alimentos:", error);
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
        </S.Select>

        <S.SearchInput>
          <S.Icon className="fa-solid fa-magnifying-glass"></S.Icon>
          <S.Input
            placeholder="Pesquisar alimento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </S.SearchInput>
        <S.Button onClick={() => setModalIsOpen(true)}>
          Incluir Novo Alimento
        </S.Button>
      </S.Wrapper>

      <S.TableContainer>
        <S.Table>
          <S.Head>
            <S.Column>
              <S.ColumnName>
                {selectedItems.length > 0 && (
                  <S.IconTrash
                    onClick={handleBulkDelete}
                    className="fa-solid fa-trash"
                  ></S.IconTrash>
                )}
              </S.ColumnName>
              <S.ColumnName>Nome</S.ColumnName>
              <S.ColumnName>Porção</S.ColumnName>
              <S.ColumnName>Calorias</S.ColumnName>
              <S.ColumnName></S.ColumnName>
            </S.Column>
          </S.Head>
          <S.Body>
            {filteredFoodItems.map((foodItem, index) => (
              <S.Line key={foodItem.id}>
                <S.Value>
                  <S.CheckBoxWrapper>
                    <S.CheckBox
                      checked={selectedItems.includes(foodItem.id)}
                      onChange={() =>
                        setSelectedItems((prev) =>
                          prev.includes(foodItem.id)
                            ? prev.filter((id) => id !== foodItem.id)
                            : [...prev, foodItem.id]
                        )
                      }
                    />
                    <S.CheckBoxCustom />
                  </S.CheckBoxWrapper>
                </S.Value>
                <S.Value>{foodItem.name}</S.Value>
                <S.Value>{foodItem.portion}</S.Value>
                <S.Value>{foodItem.calories}</S.Value>
                <S.Actions>
                  <S.IconDarked
                    onClick={() => handleOptionsClick(index)}
                    className="fa-solid fa-ellipsis-vertical"
                  ></S.IconDarked>
                  {optionsIsOpen === index && (
                    <S.ModalOptions ref={optionsRef}>
                      <S.TextBackground onClick={() => openEditModal(foodItem)}>
                        <S.ButtonText>Editar</S.ButtonText>
                      </S.TextBackground>
                      <S.TextBackground
                        onClick={() => openDeleteModal(foodItem)}
                      >
                        <S.ButtonText>Excluir</S.ButtonText>
                      </S.TextBackground>
                    </S.ModalOptions>
                  )}
                </S.Actions>
              </S.Line>
            ))}
          </S.Body>
        </S.Table>
      </S.TableContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "400px",
          },
        }}
      >
        <S.ModalTitle>Adicionar Novo Alimento</S.ModalTitle>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddedFood();
          }}
        >
          <S.WrapperForm>
            <S.Label>Nome do Alimento</S.Label>
            <S.InputModal
              type="text"
              name="name"
              placeholder="Digite o nome do alimento"
              value={newFood.name}
              onChange={handleChange}
            />
          </S.WrapperForm>
          <S.WrapperForm>
            <S.Label>Porção</S.Label>
            <S.InputModal
              type="text"
              name="portion"
              placeholder="Digite a porção do alimento"
              value={newFood.portion}
              onChange={handleChange}
            />
          </S.WrapperForm>
          <S.WrapperForm>
            <S.Label>Calorias</S.Label>
            <S.InputModal
              type="number"
              placeholder="Digite as calorias do alimento"
              name="calories"
              value={newFood.calories}
              onChange={handleChange}
            />
          </S.WrapperForm>
          <S.Wrapper
            style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
          >
            <S.ButtonCancel type="button" onClick={() => setModalIsOpen(false)}>
              Cancelar
            </S.ButtonCancel>
            <S.ButtonConfirm type="submit" disabled={loading}>
              {loading ? <ClipLoader size={20} color="#FFF" /> : "Adicionar"}
            </S.ButtonConfirm>
          </S.Wrapper>
        </S.Form>
      </Modal>

      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={() => setEditModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "400px",
          },
        }}
      >
        <S.ModalTitle>Editar Alimento</S.ModalTitle>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditFood();
          }}
        >
          <S.WrapperForm>
            <S.Label>Nome do Alimento</S.Label>
            <S.InputModal
              type="text"
              name="name"
              placeholder="Digite o nome do alimento"
              value={newFood.name}
              onChange={handleChange}
            />
          </S.WrapperForm>
          <S.WrapperForm>
            <S.Label>Porção</S.Label>
            <S.InputModal
              type="text"
              name="portion"
              placeholder="Digite a porção do alimento"
              value={newFood.portion}
              onChange={handleChange}
            />
          </S.WrapperForm>
          <S.WrapperForm>
            <S.Label>Calorias</S.Label>
            <S.InputModal
              type="number"
              name="calories"
              placeholder="Digite as calorias do alimento"
              value={newFood.calories}
              onChange={handleChange}
            />
          </S.WrapperForm>
          <S.Wrapper
            style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
          >
            <S.ButtonCancel
              type="button"
              onClick={() => setEditModalIsOpen(false)}
            >
              Cancelar
            </S.ButtonCancel>
            <S.ButtonConfirm type="submit" disabled={loading}>
              {loading ? <ClipLoader size={20} color="#FFF" /> : "Editar"}
            </S.ButtonConfirm>
          </S.Wrapper>
        </S.Form>
      </Modal>

      <Modal
        isOpen={deleteModalIsOpen}
        onRequestClose={() => setDeleteModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            zIndex: 999,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "400px",
          },
        }}
      >
        <S.ModalTitle>Excluir Alimento</S.ModalTitle>
        <S.WrapperForm>
          <S.Label>
            Tem certeza que deseja excluir o alimento {selectedFood?.name}?
          </S.Label>
        </S.WrapperForm>
        <S.Wrapper
          style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
        >
          <S.ButtonCancel
            type="button"
            onClick={() => setDeleteModalIsOpen(false)}
          >
            Cancelar
          </S.ButtonCancel>
          <S.ButtonConfirm
            type="button"
            disabled={loading}
            onClick={() => handleDeleteFood()}
          >
            {loading ? <ClipLoader size={20} color="#FFF" /> : "Excluir"}
          </S.ButtonConfirm>
        </S.Wrapper>
      </Modal>
      <Modal
        isOpen={bulkDeleteModalIsOpen}
        onRequestClose={() => setBulkDeleteModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)", zIndex: 999 },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            height: "max-content",
            maxWidth: "400px",
          },
        }}
      >
        <S.ModalTitle>Tem certeza?</S.ModalTitle>
        <S.ModalText>
          Você deseja excluir os {selectedItems.length} itens selecionados?
        </S.ModalText>
        <S.Wrapper
          style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
        >
          <S.ButtonCancel
            type="button"
            onClick={() => setBulkDeleteModalIsOpen(false)}
          >
            Cancelar
          </S.ButtonCancel>
          <S.ButtonConfirm
            type="button"
            disabled={loading}
            onClick={() => confirmBulkDelete()}
          >
            {loading ? <ClipLoader size={20} color="#FFF" /> : "Excluir"}
          </S.ButtonConfirm>
        </S.Wrapper>
      </Modal>
    </S.Container>
  );
};
