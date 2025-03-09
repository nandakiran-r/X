
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
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Search, Plus, Edit, Trash2, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Sample data for remedies
const initialRemedies = [
  { 
    id: 1, 
    name: "Ashoka Tea", 
    description: "A traditional Ayurvedic tea made from Ashoka tree bark, which helps regulate menstrual cycles and reduces pain.", 
    category: "Menstrual Pain", 
    ingredients: ["Ashoka bark", "Ginger", "Cinnamon", "Honey"],
    dosage: "1 cup twice daily during menstruation",
    status: "Active" 
  },
  { 
    id: 2, 
    name: "Shatavari Tonic", 
    description: "A tonic made from Shatavari root that helps balance hormones and improve fertility.", 
    category: "Hormonal Balance", 
    ingredients: ["Shatavari root", "Jaggery", "Cardamom"],
    dosage: "10ml once daily after breakfast",
    status: "Active" 
  },
  { 
    id: 3, 
    name: "Triphala Churna", 
    description: "A powdered mixture of three fruits that aids digestion and detoxification, which can help with PCOS symptoms.", 
    category: "PCOS", 
    ingredients: ["Amalaki", "Bibhitaki", "Haritaki"],
    dosage: "1 teaspoon with warm water before bed",
    status: "Active" 
  },
  { 
    id: 4, 
    name: "Kumari Asava", 
    description: "An Ayurvedic fermented liquid medicine made primarily from Aloe Vera that helps with menstrual irregularities.", 
    category: "Menstrual Irregularity", 
    ingredients: ["Aloe Vera", "Various herbs", "Jaggery"],
    dosage: "20ml with equal water after meals",
    status: "Inactive" 
  },
  { 
    id: 5, 
    name: "Turmeric Milk", 
    description: "A warm, comforting drink that reduces inflammation and cramps during menstruation.", 
    category: "Menstrual Pain", 
    ingredients: ["Turmeric powder", "Milk", "Black pepper", "Honey"],
    dosage: "1 cup before bedtime during menstruation",
    status: "Active" 
  },
];

const categories = [
  "Menstrual Pain",
  "Hormonal Balance",
  "PCOS",
  "Menstrual Irregularity",
  "Mood Support",
  "Energy Boost",
  "Sleep Support"
];

interface Remedy {
  id: number;
  name: string;
  description: string;
  category: string;
  ingredients: string[];
  dosage: string;
  status: string;
}

const RemediesPage = () => {
  const [remedies, setRemedies] = useState<Remedy[]>(initialRemedies);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRemedy, setEditingRemedy] = useState<Remedy | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    ingredients: "",
    dosage: "",
    status: "Active"
  });
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRemedies = remedies.filter(remedy => {
    const matchesSearch = 
      remedy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && remedy.status === "Active";
    if (activeTab === "inactive") return matchesSearch && remedy.status === "Inactive";
    
    return matchesSearch && remedy.category === activeTab;
  });

  const handleAddNew = () => {
    setEditingRemedy(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      ingredients: "",
      dosage: "",
      status: "Active"
    });
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
      status: remedy.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setRemedies(remedies.filter(remedy => remedy.id !== id));
    toast({
      title: "Remedy removed",
      description: "The remedy has been successfully removed.",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ingredientsArray = formData.ingredients
      .split(",")
      .map(item => item.trim())
      .filter(item => item);
    
    if (editingRemedy) {
      // Update existing remedy
      setRemedies(remedies.map(remedy => 
        remedy.id === editingRemedy.id ? 
        { 
          ...remedy, 
          name: formData.name,
          description: formData.description,
          category: formData.category,
          ingredients: ingredientsArray,
          dosage: formData.dosage,
          status: formData.status
        } : 
        remedy
      ));
      toast({
        title: "Remedy updated",
        description: "The remedy has been updated successfully.",
      });
    } else {
      // Add new remedy
      const newRemedy = {
        id: remedies.length > 0 ? Math.max(...remedies.map(r => r.id)) + 1 : 1,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        ingredients: ingredientsArray,
        dosage: formData.dosage,
        status: formData.status
      };
      setRemedies([...remedies, newRemedy]);
      toast({
        title: "Remedy added",
        description: "New remedy has been added successfully.",
      });
    }
    
    setIsDialogOpen(false);
  };

  // Get unique categories from remedies for the tabs
  const uniqueCategories = Array.from(new Set(remedies.map(remedy => remedy.category)));

  return (
    <div className="admin-container space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-hersaki-purple">Ayurvedic Remedies</h1>
        <Button onClick={handleAddNew} className="bg-hersaki-purple hover:bg-hersaki-dark-purple">
          <Plus className="h-4 w-4 mr-2" />
          Add New Remedy
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-2 max-w-sm">
          <Search className="h-4 w-4 text-gray-400 absolute ml-3 pointer-events-none" />
          <Input
            placeholder="Search remedies..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="Menstrual Pain">Menstrual</TabsTrigger>
            <TabsTrigger value="PCOS">PCOS</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRemedies.length > 0 ? (
          filteredRemedies.map(remedy => (
            <Card key={remedy.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-hersaki-purple">{remedy.name}</h3>
                    <Badge variant={remedy.status === "Active" ? "default" : "secondary"}>
                      {remedy.status}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="mb-3">
                    {remedy.category}
                  </Badge>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{remedy.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Ingredients</h4>
                    <div className="flex flex-wrap gap-1">
                      {remedy.ingredients.map((ingredient, idx) => (
                        <Badge key={idx} variant="outline" className="bg-hersaki-green text-gray-700">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">Dosage</h4>
                    <p className="text-sm">{remedy.dosage}</p>
                  </div>
                </div>
                
                <div className="border-t px-6 py-3 bg-gray-50 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(remedy)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(remedy.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-10 text-muted-foreground">
            <Sparkles className="h-12 w-12 mb-2 opacity-20" />
            <p>No remedies found. Try a different search term or category.</p>
          </div>
        )}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingRemedy ? "Edit Remedy" : "Add New Remedy"}</DialogTitle>
            <DialogDescription>
              {editingRemedy 
                ? "Update the remedy information in the form below." 
                : "Fill out the form below to add a new Ayurvedic remedy."}
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
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <div className="col-span-3">
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right mt-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="col-span-3 min-h-[100px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="ingredients" className="text-right mt-2">
                  Ingredients
                </Label>
                <div className="col-span-3">
                  <Textarea
                    id="ingredients"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                    className="min-h-[80px]"
                    placeholder="Enter ingredients separated by commas"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter ingredients separated by commas (e.g., Turmeric, Ginger, Honey)
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dosage" className="text-right">
                  Dosage
                </Label>
                <Input
                  id="dosage"
                  name="dosage"
                  value={formData.dosage}
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
                {editingRemedy ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RemediesPage;
