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
    selectedCategory,
    setSelectedCategory,
    updateCategory,
    deleteCategory,
    addCategory,
    setFoodItems,
  } = useFoodContext();

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [categoyModalIsOpen, setCategoryModalIsOpen] = useState<boolean>(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
  const [editCategoryModalIsOpen, setEditCategoryModalIsOpen] =
    useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [deleteCategoryModalIsOpen, setDeleteCategoryModalIsOpen] =
    useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [newFood, setNewFood] = useState({
    id: 0,
    name: "",
    portion: "",
    calories: 0,
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState<string>();
  const [newCategory, setNewCategory] = useState<string>();
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
    setSelectedCategoryItem(selectedCategory);
  }, [selectedCategory]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchFoodItems(selectedCategory);
    }
  };

  const handleEditFood = async () => {
    setLoading(true);
    if (!selectedFood || !selectedFood.id) return;
    try {
      const updatedFood = {
        ...selectedFood,
        name: newFood.name,
        portion: newFood.portion,
        calories: Number(newFood.calories),
      };
      await updateFoodItem(selectedCategory, updatedFood);
    } catch (error) {
      console.error("Error updating food item: ", error);
      toast.error("Error updating food item.");
    } finally {
      setLoading(false);
      setEditModalIsOpen(false);
    }
  };

  const handleAddCategoy = async () => {
    setLoading(true);
    if (!newCategory) return;
    try {
      await addCategory(newCategory);
    } catch (error) {
      console.error("Erro ao criar categoria: ", error);
      toast.error("Erro ao criar categoria.");
    } finally {
      setLoading(false);
      setCategoryModalIsOpen(false);
    }
  };
  const handleEditCategoy = async () => {
    setLoading(true);
    if (!selectedCategoryItem) return;
    try {
      await updateCategory(selectedCategory, selectedCategoryItem);
    } catch (error) {
      console.error("Erro ao atualizar categoria: ", error);
      toast.error("Erro ao atualizar categoria.");
    } finally {
      setLoading(false);
      setEditCategoryModalIsOpen(false);
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
      await deleteFoodItem(selectedCategory, deletedFood.id);
    } catch (error) {
      console.error("Error updating food item: ", error);
      toast.error("Error updating food item.");
    } finally {
      setLoading(false);
      setDeleteCategoryModalIsOpen(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory);
    } catch (error) {
      console.error("Erro ao excluir categoria: ", error);
      toast.error("Erro ao excluir categoria.");
    } finally {
      setLoading(false);
      setDeleteCategoryModalIsOpen(false);
      setFoodItems([]);
    }
  };

  const handleAddedFood = async () => {
    setLoading(true);
    try {
      const addedFood = {
        id: GenerateId(),
        name: newFood.name,
        portion: newFood.portion,
        calories: Number(newFood.calories),
      };
      await addFoodItem(selectedCategory, addedFood);
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
      const name = item?.name || "";
      return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredFoodItems(filteredData);
  }, [searchTerm, foodItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };
  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategoryItem(e.target.value);
  };
  const handleChangeNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleBulkDelete = () => {
    setBulkDeleteModalIsOpen(true);
  };

  const confirmBulkDelete = async () => {
    try {
      setLoading(true);
      for (let i = 0; i < selectedItems.length; i++) {
        await deleteFoodItem(selectedCategory, selectedItems[i]);
      }
      setSelectedItems([]);
      setBulkDeleteModalIsOpen(false);
    } catch (error) {
      toast.error("Erro ao excluir alimentos.");
      console.error("Erro ao excluir alimentos:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Food Items:", foodItems);
  }, [foodItems]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled selected>
            Selecione a categoria
          </option>
          {categories &&
            categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
        </S.Select>
        <S.IconsGroup>
          <S.IconOperation
            className="fa-solid fa-trash"
            title="Remover categoria"
            onClick={() => setDeleteCategoryModalIsOpen(true)}
          ></S.IconOperation>
          <S.IconOperation
            className="fa-solid fa-pen-to-square"
            title="Editar categoria"
            onClick={() => setEditCategoryModalIsOpen(true)}
          ></S.IconOperation>
          <S.IconOperation
            className="fa-solid fa-circle-plus"
            title="Adicionar categoria"
            onClick={() => setCategoryModalIsOpen(true)}
          ></S.IconOperation>
        </S.IconsGroup>
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
            {selectedCategory
              ? filteredFoodItems.map((foodItem, index) =>
                  foodItem ? (
                    <S.Line key={index}>
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
                          <S.CheckBoxCustom>
                            <i className="fa-solid fa-check"></i>
                          </S.CheckBoxCustom>
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
                            <S.TextBackground
                              onClick={() => openEditModal(foodItem)}
                            >
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
                  ) : (
                    ""
                  )
                )
              : ""}
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
        isOpen={editCategoryModalIsOpen}
        onRequestClose={() => setEditCategoryModalIsOpen(false)}
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
        <S.ModalTitle>Editar Categoria</S.ModalTitle>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditCategoy();
          }}
        >
          <S.WrapperForm>
            <S.Label>Nome do Categoria</S.Label>
            <S.InputModal
              type="text"
              name="name"
              placeholder="Digite o nome do categoria"
              value={selectedCategoryItem}
              onChange={handleChangeCategory}
            />
          </S.WrapperForm>
          <S.Wrapper
            style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
          >
            <S.ButtonCancel
              type="button"
              onClick={() => setEditCategoryModalIsOpen(false)}
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
        isOpen={categoyModalIsOpen}
        onRequestClose={() => setCategoryModalIsOpen(false)}
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
        <S.ModalTitle>Adicionar Categoria</S.ModalTitle>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCategoy();
          }}
        >
          <S.WrapperForm>
            <S.Label>Nome do Categoria</S.Label>
            <S.InputModal
              type="text"
              name="name"
              placeholder="Digite o nome do categoria"
              value={newCategory}
              onChange={handleChangeNewCategory}
            />
          </S.WrapperForm>
          <S.Wrapper
            style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
          >
            <S.ButtonCancel
              type="button"
              onClick={() => setCategoryModalIsOpen(false)}
            >
              Cancelar
            </S.ButtonCancel>
            <S.ButtonConfirm type="submit" disabled={loading}>
              {loading ? <ClipLoader size={20} color="#FFF" /> : "Criar"}
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
        isOpen={deleteCategoryModalIsOpen}
        onRequestClose={() => setDeleteCategoryModalIsOpen(false)}
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
        <S.ModalTitle>Excluir Categoria</S.ModalTitle>
        <S.WrapperForm>
          <S.Label>
            Tem certeza que deseja excluir a categoria {selectedCategory}?
          </S.Label>
        </S.WrapperForm>
        <S.Wrapper
          style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
        >
          <S.ButtonCancel
            type="button"
            onClick={() => setDeleteCategoryModalIsOpen(false)}
          >
            Cancelar
          </S.ButtonCancel>
          <S.ButtonConfirm
            type="button"
            disabled={loading}
            onClick={() => handleDeleteCategory()}
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
