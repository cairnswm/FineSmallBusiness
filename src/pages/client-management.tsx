      {isAddModalOpen && (
        <AddClientModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      )}
      {editClientId !== null && (
        <EditClientModal
          clientId={editClientId}
          onClose={handleCloseEditModal}
        />
      )}