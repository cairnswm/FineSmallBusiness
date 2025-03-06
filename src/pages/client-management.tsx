import React, { useState } from "react";
import { useDashboardContext } from "@/context/DashboardContext";
import ClientCard from "@/components/dashboard/ClientCard";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ClientManagement = () => {
  console.log("CLIENTS")
  const { clients } = useDashboardContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editClientId, setEditClientId] = useState<number | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleAddClient = () => {
    setIsAddModalOpen(true);
  };

  const handleEditClient = (id: number) => {
    setEditClientId(id);
  };

  const handleCloseEditModal = () => {
    setEditClientId(null);
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && client.status === "active") ||
      (statusFilter === "inactive" && client.status === "inactive");
    return matchesSearch && matchesStatus;
  });

  console.log("Clients", clients);
  console.log("Filtered Clients", filteredClients);

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back
        </Button>
      </header>


      <Button onClick={handleAddClient}>Add Client</Button>
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex space-x-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => handleStatusFilterChange("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "active" ? "default" : "outline"}
            onClick={() => handleStatusFilterChange("active")}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "inactive" ? "default" : "outline"}
            onClick={() => handleStatusFilterChange("inactive")}
          >
            Inactive
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <ClientCard
            key={client.id}
            id={client.id}
            name={client.name}
            email={client.email}
            phone={client.phone}
            address={client.address}
            onEdit={handleEditClient}
            onDelete={(id) => console.log(`Delete client ${id}`)}
            status={client.status}
            onToggleStatus={(id) =>
              client.status === "active"
                ? updateClientStatus(id, "inactive")
                : updateClientStatus(id, "active")
            }
          />
        ))}
      </div>

      <AddClientModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      {editClientId !== null && (
        <EditClientModal
          clientId={editClientId}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default ClientManagement;