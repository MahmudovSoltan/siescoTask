// components/modals/assignUserModal.tsx
import { useState } from "react";
import styles from "./css/assignUserModal.module.css";
import { toast } from "react-toastify";

interface AssignUserModalProps<TItem> {
  title: string;
  onclose: () => void;
  contextId: number | null;
  items: TItem[];
  alreadyLinked: (item: TItem, ctxId: number | null) => boolean;
  onSave: (ctxId: number | null, selectedItems: TItem[]) => void;
  getItemKey: (item: TItem) => number;
  getItemTitle: (item: TItem) => string;
  getItemSubtitle: (item: TItem) => string;
}

const AssignUserModal = <TItem,>({
  title,
  onclose,
  contextId,
  items,
  alreadyLinked,
  onSave,
  getItemKey,
  getItemTitle,
  getItemSubtitle,
}: AssignUserModalProps<TItem>) => {
  const [selectedItems, setSelectedItems] = useState<TItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSelection = (item: TItem) => {
    setSelectedItems((prev) =>
      prev.some((i) => getItemKey(i) === getItemKey(item))
        ? prev.filter((i) => getItemKey(i) !== getItemKey(item))
        : [...prev, item]
    );
  };

  const isSelected = (id: number) =>
    selectedItems.some((i) => getItemKey(i) === id);

  const filteredItems = items.filter(
    (item) =>
      !alreadyLinked(item, contextId) &&
      getItemTitle(item).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {

    onSave(contextId, selectedItems);
    toast.success("Successful Add")
    onclose();
  };
  console.log(title);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
        </div>

        <div className={styles.selectedUsers}>
          {selectedItems.map((item) => (
            <button
              key={getItemKey(item)}
              className={styles.selectedUserItem}
              onClick={() => toggleSelection(item)}
            >
              {getItemTitle(item)}
              <span className={styles.removeUser}>×</span>
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Axtar..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {
          filteredItems.length === 0 ? <p>{title !== "İstifadəçi seç" ? "Bütün Tapşırıqlara seçilib!" : "Bütün İstifadəçilər seçilib!"}</p> : <ul className={styles.usersList}>

            {filteredItems.map((item) => {
              const selected = isSelected(getItemKey(item));

              return (
                <li
                  key={getItemKey(item)}
                  className={`${styles.userItem} ${selected ? styles.selected : ""}`}
                >
                  <button onClick={() => toggleSelection(item)}>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{getItemTitle(item)}</span>
                      <span className={styles.userEmail}>{getItemSubtitle(item)}</span>
                    </div>
                  </button>
                  {selected && <span className={styles.checkmark}>✓</span>}
                </li>
              );
            })}
          </ul>
        }


        <div className={styles.modalFooter}>
          <button onClick={onclose} className={styles.cancelButton}>
            Bağla
          </button>
          <button onClick={handleSave} className={styles.submitButton}>
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignUserModal;
