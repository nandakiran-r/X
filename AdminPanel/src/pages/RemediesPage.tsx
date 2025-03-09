import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase"; // Ensure this is correctly set up
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Menstrual Pain", "Hormonal Balance", "PCOS", "Menstrual Irregularity"];

interface Remedy {
  id: string;
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  dosage: string;
  status: string;
}

const RemediesPage = () => {
  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRemedy, setEditingRemedy] = useState<Remedy | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    ingredients: "",
    dosage: "",
    status: "Active",
  });

  // Fetch remedies from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "remedies"), (snapshot) => {
      const remediesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Remedy));
      setRemedies(remediesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNew = () => {
    setEditingRemedy(null);
    setFormData({ name: "", description: "", category: "", ingredients: "", dosage: "", status: "Active" });
    setIsDialogOpen(true);
  };

  const handleEdit = (remedy: Remedy) => {
    setEditingRemedy(remedy);
    setFormData({
      name: remedy.name,
      description: remedy.description,
      category: remedy.category,
      ingredients: remedy.ingredients.join(", "),
      dosage: remedy.dosage,
      status: remedy.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "remedies", id));
    toast({ title: "Remedy removed", description: "The remedy has been successfully removed." });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientsArray = formData.ingredients.split(",").map((item) => item.trim()).filter((item) => item);

    if (editingRemedy) {
      // Update existing remedy
      await updateDoc(doc(db, "remedies", editingRemedy.id), {
        ...formData,
        ingredients: ingredientsArray,
      });
      toast({ title: "Remedy updated", description: "The remedy has been updated successfully." });
    } else {
      // Add new remedy
      await addDoc(collection(db, "remedies"), {
        ...formData,
        ingredients: ingredientsArray,
      });
      toast({ title: "Remedy added", description: "New remedy has been added successfully." });
    }

    setIsDialogOpen(false);
  };

  return (
    <div className="admin-container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Ayurvedic Remedies</h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Remedy
        </Button>
      </div>

      <Input placeholder="Search remedies..." value={searchTerm} onChange={handleSearch} />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {remedies.map((remedy) => (
            <TableRow key={remedy.id}>
              <TableCell>{remedy.name}</TableCell>
              <TableCell>{remedy.category}</TableCell>
              <TableCell>{remedy.dosage}</TableCell>
              <TableCell>{remedy.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEdit(remedy)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-500" onClick={() => handleDelete(remedy.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Add/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingRemedy ? "Edit Remedy" : "Add New Remedy"}</DialogTitle>
            <DialogDescription>
              {editingRemedy ? "Update the remedy information." : "Fill out the form below to add a new remedy."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <Label>Name</Label>
            <Input name="name" value={formData.name} onChange={handleInputChange} required />

            <Label>Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>{categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
            </Select>

            <Label>Ingredients (comma-separated)</Label>
            <Textarea name="ingredients" value={formData.ingredients} onChange={handleInputChange} required />

            <Label>Dosage</Label>
            <Input name="dosage" value={formData.dosage} onChange={handleInputChange} required />

            <DialogFooter>
              <Button type="submit">{editingRemedy ? "Update" : "Add"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RemediesPage;
