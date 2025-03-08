
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SearchIcon, Leaf, CheckCircle, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

// Sample remedies data
const remediesData = {
  pcos: [
    {
      id: 1,
      title: "Cinnamon Tea",
      description: "Helps balance blood sugar levels and reduce insulin resistance, which is often associated with PCOS.",
      ingredients: ["1 cinnamon stick or 1/2 tsp powder", "1 cup water", "Optional: honey"],
      instructions: "Boil cinnamon in water for 10 minutes. Strain and add honey if desired.",
      dosage: "Drink 1-2 cups daily"
    },
    {
      id: 2,
      title: "Turmeric Golden Milk",
      description: "Anti-inflammatory and helps balance hormones.",
      ingredients: ["1 cup milk (dairy or plant-based)", "1 tsp turmeric powder", "1/4 tsp black pepper", "1/2 tsp cinnamon", "Optional: honey"],
      instructions: "Heat milk, add spices, simmer for 5 minutes. Add honey if desired.",
      dosage: "Drink before bedtime"
    },
    {
      id: 3,
      title: "Fenugreek Seeds",
      description: "May help regulate cycles and improve insulin sensitivity.",
      ingredients: ["1 tbsp fenugreek seeds", "1 cup water"],
      instructions: "Soak seeds overnight, consume in the morning.",
      dosage: "Daily for at least 3 months"
    }
  ],
  period: [
    {
      id: 1,
      title: "Ginger Tea",
      description: "Helps reduce menstrual cramps and inflammation.",
      ingredients: ["1-inch fresh ginger", "1 cup water", "Optional: lemon and honey"],
      instructions: "Boil ginger in water for 5-10 minutes. Add lemon and honey if desired.",
      dosage: "2-3 cups during menstruation"
    },
    {
      id: 2,
      title: "Ajwain (Carom Seed) Compress",
      description: "Provides warming relief for cramps and bloating.",
      ingredients: ["2 tbsp ajwain seeds", "Clean cloth for compress"],
      instructions: "Warm seeds in a pan, wrap in cloth and apply to lower abdomen.",
      dosage: "Apply for 10-15 minutes as needed"
    },
    {
      id: 3,
      title: "Warm Castor Oil Pack",
      description: "Improves circulation and reduces cramping.",
      ingredients: ["Castor oil", "Clean cloth", "Hot water bottle"],
      instructions: "Apply oil on abdomen, place cloth over it, then hot water bottle.",
      dosage: "15-20 minutes before bedtime"
    }
  ],
  hormones: [
    {
      id: 1,
      title: "Ashwagandha",
      description: "Adaptogenic herb that helps balance hormones and reduce stress.",
      ingredients: ["1/2 tsp ashwagandha powder", "1 cup warm milk"],
      instructions: "Mix powder in warm milk, add honey if desired.",
      dosage: "Drink daily before bedtime"
    },
    {
      id: 2,
      title: "Shatavari Root",
      description: "Helps balance female hormones and supports reproductive health.",
      ingredients: ["1/2 tsp shatavari powder", "1 cup warm water or milk"],
      instructions: "Mix powder in warm liquid, add honey if desired.",
      dosage: "Drink daily"
    }
  ]
};

const Remedies = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRemedies, setSavedRemedies] = useState<number[]>([]);

  const handleSaveRemedy = (id: number) => {
    if (savedRemedies.includes(id)) {
      setSavedRemedies(savedRemedies.filter(remedyId => remedyId !== id));
      toast({
        title: "Remedy Removed",
        description: "Remedy removed from your favorites"
      });
    } else {
      setSavedRemedies([...savedRemedies, id]);
      toast({
        title: "Remedy Saved",
        description: "Remedy added to your favorites"
      });
    }
  };

  // Filter remedies based on search term
  const filterRemedies = (remedies: any[]) => {
    if (!searchTerm) return remedies;
    return remedies.filter(remedy => 
      remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      remedy.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Get all remedies for search
  const allRemedies = [
    ...remediesData.pcos,
    ...remediesData.period, 
    ...remediesData.hormones
  ];

  const renderRemedyCard = (remedy: any) => (
    <motion.div
      key={remedy.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-sakhi-mint/20 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{remedy.title}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSaveRemedy(remedy.id)}
              className={savedRemedies.includes(remedy.id) ? "text-primary" : ""}
            >
              {savedRemedies.includes(remedy.id) ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <BookOpen className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{remedy.description}</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-1">Ingredients:</h4>
            <ul className="text-sm list-disc pl-5">
              {remedy.ingredients.map((ingredient: string, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div className="mb-3">
            <h4 className="font-medium text-sm mb-1">Instructions:</h4>
            <p className="text-sm">{remedy.instructions}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">Recommended Usage:</h4>
            <p className="text-sm">{remedy.dosage}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Ayurvedic Remedies</h1>
        <p className="text-muted-foreground mb-6">Natural solutions for your health</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6"
      >
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search remedies..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>

      {searchTerm ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Search Results</h2>
          {filterRemedies(allRemedies).length > 0 ? (
            filterRemedies(allRemedies).map(renderRemedyCard)
          ) : (
            <p className="text-center py-8 text-muted-foreground">No remedies found. Try a different search term.</p>
          )}
        </div>
      ) : (
        <Tabs defaultValue="pcos">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="pcos">PCOS</TabsTrigger>
            <TabsTrigger value="period">Period Care</TabsTrigger>
            <TabsTrigger value="hormones">Hormones</TabsTrigger>
          </TabsList>

          <TabsContent value="pcos" className="space-y-4">
            <div className="flex items-center bg-sakhi-lavender/20 p-3 rounded-lg mb-4">
              <Leaf className="h-5 w-5 text-primary-foreground mr-3" />
              <p className="text-sm">Natural remedies for managing PCOS symptoms</p>
            </div>
            
            {remediesData.pcos.map(renderRemedyCard)}
          </TabsContent>

          <TabsContent value="period" className="space-y-4">
            <div className="flex items-center bg-sakhi-pink/20 p-3 rounded-lg mb-4">
              <Leaf className="h-5 w-5 text-secondary-foreground mr-3" />
              <p className="text-sm">Natural remedies for menstrual discomfort</p>
            </div>
            
            {remediesData.period.map(renderRemedyCard)}
          </TabsContent>

          <TabsContent value="hormones" className="space-y-4">
            <div className="flex items-center bg-sakhi-mint/20 p-3 rounded-lg mb-4">
              <Leaf className="h-5 w-5 text-accent-foreground mr-3" />
              <p className="text-sm">Natural remedies for hormone balance</p>
            </div>
            
            {remediesData.hormones.map(renderRemedyCard)}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Remedies;
