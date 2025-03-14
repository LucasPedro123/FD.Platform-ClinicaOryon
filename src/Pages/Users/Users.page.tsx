import React, { useEffect, useRef, useState } from "react";
import * as S from "./User.style";
import iconUser from "../../assets/icon-user.png";
import Modal from "react-modal";
import { useUserContext } from "../../Context/Users.context";
import { IUser } from "../../Interfaces/web.interfaces";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { STYLE_GUIDE } from "../../assets/Style/global";

Modal.setAppElement("#root");

export const Users: React.FC = () => {
  const {
    users,
    userImages,
    deleteUserAccount,
    getUserDailyCalories,
    getUserWeeklyCalories,
  } = useUserContext();
  const [showModalUser, setShowModalUser] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [deleteUsersModal, setDeleteUsersModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [optionsIsOpen, setOptionsIsOpen] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dailyCalories, setDailyCalories] = useState<
    { date: string; calories: number }[]
  >([]);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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
  }, []);

  const handleDeleteUser = async () => {
    if (selectedUser) {
      setLoading(true);
      try {
        await deleteUserAccount(selectedUser);
        setShowModal(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Error deleting user.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleOptionsClick = (index: number) => {
    setOptionsIsOpen(optionsIsOpen === index ? null : index);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const handleViewUser = async (user: IUser) => {
    if (!getUserWeeklyCalories || !getUserDailyCalories) {
      console.error("Funções de busca de calorias não estão definidas");
      toast.error("Erro ao buscar as calorias do usuário.");
      return;
    }

    setLoading(true);
    try {
      const dailyCalories = await getUserDailyCalories(user.userId);
      setDailyCalories(dailyCalories);
      setSelectedUser(user);
      setShowModalUser(true);
    } catch (error) {
      console.error("Error fetching calories:", error);
      toast.error("Error fetching calories.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (dateString == undefined) {
      return;
    }

    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleMassDelete = async () => {
    if (selectedUsers.length === 0) {
      toast.warn("Nenhum usuário selecionado para exclusão.");
      return;
    }

    setLoading(true);
    try {
      const usersToDelete = users.filter((user) =>
        selectedUsers.includes(user.userId)
      );
      for (let i = 0; i < usersToDelete.length; i++) {
        await deleteUserAccount(usersToDelete[i]);
      }

      setSelectedUsers([]);
      toast.success("Usuários excluídos com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuários:", error);
      toast.error("Erro ao excluir usuários.");
    } finally {
      setLoading(false);
      setDeleteUsersModal(false);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <S.UserContainer>
      <S.UsersWrapper>
        <S.MetricsDiv>
          <S.UserDiv>
            <S.UserLength>{filteredUsers.length}</S.UserLength>
            <S.UserLabel>Peoples</S.UserLabel>
          </S.UserDiv>
        </S.MetricsDiv>
        <S.SearchInput>
          <S.Icon className="fa-solid fa-magnifying-glass"></S.Icon>
          <S.Input
            placeholder="Pesquisar usuário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchInput>
      </S.UsersWrapper>
      <S.TableContainer>
        <S.Table>
          <S.Head>
            <S.Column>
              <S.ColumnName>
                {selectedUsers.length > 0 && (
                  <S.IconTrash
                    onClick={() => setDeleteUsersModal(true)}
                    className="fa-solid fa-trash"
                  ></S.IconTrash>
                )}
              </S.ColumnName>
              <S.ColumnName>Users</S.ColumnName>
              <S.ColumnName>Email</S.ColumnName>
              <S.ColumnName>Telefone</S.ColumnName>
              <S.ColumnName>Data de Nascimento</S.ColumnName>
              <S.ColumnName>Calorias Semanais</S.ColumnName>
              <S.ColumnName></S.ColumnName>
            </S.Column>
          </S.Head>
          <S.Body>
            {filteredUsers.map((user, index: number) => (
              <S.Line key={user.userId}>
                <S.Value>
                  <S.CheckBoxWrapper>
                    <S.CheckBoxWrapper>
                      <S.CheckBox
                        checked={selectedUsers.includes(user.userId)}
                        onChange={() => handleSelectUser(user.userId)}
                      />
                      <S.CheckBoxCustom>
                        <i className="fa-solid fa-check"></i>
                      </S.CheckBoxCustom>
                    </S.CheckBoxWrapper>
                  </S.CheckBoxWrapper>
                </S.Value>
                <S.LineProfile>
                  {userImages[user.userId] ? (
                    <img
                      src={userImages[user.userId]}
                      alt={user.name}
                      style={{
                        width: "43px",
                        height: "43px",
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                    />
                  ) : (
                    <img src={iconUser} alt="user" />
                  )}
                  {user.name}
                </S.LineProfile>
                <S.Value>{user.email}</S.Value>
                <S.Value>{user.phone}</S.Value>
                <S.Value>{formatDate(user.birthDate)}</S.Value>
                <S.Value>{user.weeklyCalories?.toFixed(2)}</S.Value>
                <S.Actions>
                  <S.IconDarked
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={() => {
                      setSelectedUser(user);
                      handleOptionsClick(index);
                    }}
                  ></S.IconDarked>
                  {optionsIsOpen === index && (
                    <S.ModalOptions ref={optionsRef}>
                      <S.TextBackground onClick={() => handleViewUser(user)}>
                        <S.ButtonText>Visualizar</S.ButtonText>
                      </S.TextBackground>
                      <S.TextBackground onClick={() => setShowModal(true)}>
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
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Confirm Delete"
        style={{
          overlay: {
            zIndex: 999,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "450px",
            padding: "20px",
          },
        }}
      >
        <S.ModalTitle>Deseja excluir este usuário?</S.ModalTitle>
        <S.ModalText>
          Tem certeza que deseja excluir o usuário {selectedUser?.name}?
        </S.ModalText>
        <S.ButtonWrapper>
          <S.ButtonCancel onClick={() => setShowModal(false)}>
            Cancelar
          </S.ButtonCancel>
          <S.ButtonConfirm
            onClick={handleDeleteUser}
            style={{ marginLeft: "10px" }}
          >
            {loading ? <ClipLoader size={20} color="#FFF" /> : "Excluir"}
          </S.ButtonConfirm>
        </S.ButtonWrapper>
      </Modal>

      <Modal
        isOpen={showModalUser}
        onRequestClose={() => setShowModalUser(false)}
        contentLabel="Confirm Delete"
        style={{
          overlay: {
            zIndex: 999,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "450px",
            padding: "20px",
            backgroundColor: "#fff",
          },
        }}
      >
        {selectedUser && (
          <S.ModalContent>
            <S.ModalUserWrapper>
              {userImages[selectedUser.userId] ? (
                <img
                  src={userImages[selectedUser.userId]}
                  alt={selectedUser.name}
                  style={{
                    width: "43px",
                    height: "43px",
                    objectFit: "cover",
                    borderRadius: "100%",
                  }}
                />
              ) : (
                <img src={iconUser} alt="user" />
              )}
              <S.ModelUserName>{selectedUser.name}</S.ModelUserName>
            </S.ModalUserWrapper>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyCalories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="calories"
                  fill={STYLE_GUIDE.color.secondary}
                  radius={50}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
            <S.ButtonCancel onClick={() => setShowModalUser(false)}>
              Cancelar
            </S.ButtonCancel>
          </S.ModalContent>
        )}
      </Modal>
      <Modal
        isOpen={deleteUsersModal}
        onRequestClose={() => setDeleteUsersModal(false)}
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
          Você deseja excluir os {selectedUsers.length} usuários selecionados?
        </S.ModalText>
        <S.Wrapper
          style={{ gap: 22, marginTop: 22, justifyContent: "flex-end" }}
        >
          <S.ButtonCancel
            type="button"
            onClick={() => setDeleteUsersModal(false)}
          >
            Cancelar
          </S.ButtonCancel>
          <S.ButtonConfirm
            type="button"
            disabled={loading}
            onClick={() => handleMassDelete()}
          >
            {loading ? <ClipLoader size={20} color="#FFF" /> : "Excluir"}
          </S.ButtonConfirm>
        </S.Wrapper>
      </Modal>
    </S.UserContainer>
  );
};
