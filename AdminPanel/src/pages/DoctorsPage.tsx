
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Edit, Trash2, Check, X } from "lucide-react";

// Sample data for doctors
const initialDoctors = [
  { 
    id: 1, 
    name: "Dr. Aditi Sharma", 
    specialization: "Ayurvedic Gynecologist", 
    experience: "12 years", 
    location: "Delhi",
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Dr. Priya Patel", 
    specialization: "PCOS Specialist", 
    experience: "8 years", 
    location: "Mumbai",
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Dr. Rajesh Kumar", 
    specialization: "Ayurvedic Practitioner", 
    experience: "15 years", 
    location: "Bangalore",
    status: "Active" 
  },
  { 
    id: 4, 
    name: "Dr. Meena Reddy", 
    specialization: "Hormonal Health", 
    experience: "10 years", 
    location: "Hyderabad",
    status: "Inactive" 
  },
  { 
    id: 5, 
    name: "Dr. Ananya Singh", 
    specialization: "Women's Wellness", 
    experience: "6 years", 
    location: "Chennai",
    status: "Active" 
  },
];

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  location: string;
  status: string;
}

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    experience: "",
    location: "",
    status: "Active"
  });
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setEditingDoctor(null);
    setFormData({
      name: "",
      specialization: "",
      experience: "",
      location: "",
      status: "Active"
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      location: doctor.location,
      status: doctor.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
    toast({
      title: "Doctor removed",
      description: "The doctor has been successfully removed.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDoctor) {
      // Update existing doctor
      setDoctors(doctors.map(doc => 
        doc.id === editingDoctor.id ? 
        { ...doc, ...formData } : 
        doc
      ));
      toast({
        title: "Doctor updated",
        description: "The doctor information has been updated successfully.",
      });
    } else {
      // Add new doctor
      const newDoctor = {
        id: doctors.length > 0 ? Math.max(...doctors.map(d => d.id)) + 1 : 1,
        ...formData
      };
      setDoctors([...doctors, newDoctor]);
      toast({
        title: "Doctor added",
        description: "New doctor has been added successfully.",
      });
    }
    
    setIsDialogOpen(false);
  };

  return (
    <div className="admin-container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-hersaki-purple">Doctors</h1>
        <Button onClick={handleAddNew} className="bg-hersaki-purple hover:bg-hersaki-dark-purple">
          <Plus className="h-4 w-4 mr-2" />
          Add New Doctor
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 max-w-sm">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-8"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map(doctor => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.experience}</TableCell>
                  <TableCell>{doctor.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doctor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {doctor.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(doctor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(doctor.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No doctors found. Try a different search term.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
            <DialogDescription>
              {editingDoctor 
                ? "Update the doctor's information in the form below." 
                : "Fill out the form below to add a new doctor to the system."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialization" className="text-right">
                  Specialization
                </Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Experience
                </Label>
                <Input
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="col-span-3 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="active"
                      name="status"
                      value="Active"
                      checked={formData.status === "Active"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-hersaki-purple focus:ring-hersaki-purple"
                    />
                    <Label htmlFor="active" className="text-sm font-normal">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="inactive"
                      name="status"
                      value="Inactive"
                      checked={formData.status === "Inactive"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-gray-500 focus:ring-gray-500"
                    />
                    <Label htmlFor="inactive" className="text-sm font-normal">Inactive</Label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-hersaki-purple hover:bg-hersaki-dark-purple">
                {editingDoctor ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorsPage;
