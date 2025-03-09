import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SearchIcon, Leaf, BookmarkPlus, BookmarkCheck, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {db} from "@/config/firebase";

interface Remedy {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
  dosage: string;
}

interface RemediesData {
  pcos: Remedy[];
  period: Remedy[];
  hormones: Remedy[];
  wellness: Remedy[];
}

// Sample remedies data
const remediesData: RemediesData = {
  pcos: [
    { id: 1, title: "Cinnamon Tea", description: "Helps balance blood sugar levels and improves insulin sensitivity.", ingredients: ["1 cinnamon stick", "1 cup water"], instructions: "Boil for 10 min.", dosage: "1-2 cups daily" },
    { id: 2, title: "Fenugreek Seeds", description: "Regulates menstrual cycles and improves insulin resistance.", ingredients: ["1 tbsp fenugreek seeds", "1 cup water"], instructions: "Soak overnight, consume in the morning.", dosage: "Daily for 3 months" },
    { id: 7, title: "Ashoka Bark Tea", description: "Supports uterine health and regulates hormones.", ingredients: ["1 tsp Ashoka bark powder", "1 cup water"], instructions: "Boil for 5-10 min, strain, and drink.", dosage: "1 cup daily" },
    { id: 8, title: "Shatavari Powder", description: "Balances hormones and supports reproductive health.", ingredients: ["1 tsp Shatavari powder", "1 cup warm milk or water"], instructions: "Mix and consume.", dosage: "Twice daily" }
  ],
  period: [
    { id: 3, title: "Ginger Tea", description: "Reduces menstrual cramps and inflammation.", ingredients: ["1-inch fresh ginger", "1 cup water"], instructions: "Boil for 5-10 min.", dosage: "2-3 cups during menstruation" },
    { id: 9, title: "Ajwain Water", description: "Relieves bloating and menstrual pain.", ingredients: ["1 tsp ajwain (carom seeds)", "1 cup water"], instructions: "Boil for 5 min, strain, and drink.", dosage: "1-2 cups daily during menstruation" },
    { id: 10, title: "Turmeric Milk", description: "Reduces inflammation and pain during menstruation.", ingredients: ["1/2 tsp turmeric powder", "1 cup warm milk"], instructions: "Mix and drink.", dosage: "1 cup daily during menstruation" }
  ],
  hormones: [
    { id: 4, title: "Ashwagandha", description: "Balances hormones, reduces stress, and supports adrenal health.", ingredients: ["1/2 tsp Ashwagandha powder", "1 cup warm milk or water"], instructions: "Mix and consume.", dosage: "Before bedtime" },
    { id: 11, title: "Shatavari Kalpa", description: "Supports female reproductive health and hormone balance.", ingredients: ["1 tsp Shatavari powder", "1 cup warm milk or water"], instructions: "Mix and consume.", dosage: "Twice daily" },
    { id: 12, title: "Licorice (Mulethi) Tea", description: "Regulates cortisol levels and supports hormonal balance.", ingredients: ["1 tsp licorice root powder", "1 cup water"], instructions: "Boil for 5-10 min, strain, and drink.", dosage: "1 cup daily" }
  ],
  wellness: [
    { id: 5, title: "Triphala Water", description: "Detoxifies the body and improves digestion.", ingredients: ["1 tsp Triphala powder", "1 cup warm water"], instructions: "Mix and drink.", dosage: "Before bedtime" },
    { id: 6, title: "Tulsi (Holy Basil) Tea", description: "Boosts immunity and reduces stress.", ingredients: ["5-6 fresh Tulsi leaves", "1 cup water"], instructions: "Boil for 5-10 min, strain, and drink.", dosage: "1-2 cups daily" },
    { id: 13, title: "Amla Juice", description: "Rich in Vitamin C, improves digestion, and boosts immunity.", ingredients: ["1 tbsp Amla juice", "1 cup water"], instructions: "Mix and drink.", dosage: "Morning on an empty stomach" },
    { id: 14, title: "Ghee with Warm Water", description: "Improves digestion and detoxifies the body.", ingredients: ["1 tsp pure cow ghee", "1 cup warm water"], instructions: "Mix and drink.", dosage: "Morning on an empty stomach" },
    { id: 15, title: "Fennel (Saunf) Water", description: "Relieves bloating and improves digestion.", ingredients: ["1 tsp fennel seeds", "1 cup water"], instructions: "Soak overnight, strain, and drink.", dosage: "Morning on an empty stomach" }
  ]
};

const fadeInUp = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

const Remedies = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [savedRemedies, setSavedRemedies] = useState<number[]>([]);

  const handleSaveRemedy = (id: number) => {
    setSavedRemedies((prev) => {
      if (prev.includes(id)) {
        toast({ title: "Removed from Favorites", description: "Remedy removed from your saved list." });
        return prev.filter((remedyId) => remedyId !== id);
      } else {
        toast({ title: "Added to Favorites", description: "Remedy saved successfully." });
        return [...prev, id];
      }
    });
  };

  const allRemedies = Object.values(remediesData).flat();
  const filteredRemedies = allRemedies.filter(({ title, description, ingredients }) =>
    [title, description, ...ingredients].some((text) => text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const renderRemedyCard = (remedy: Remedy) => (
    <motion.div key={remedy.id} {...fadeInUp} className="mb-4">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gray-100 pb-2">
          <div className="flex justify-between">
            <CardTitle className="text-lg">{remedy.title}</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => handleSaveRemedy(remedy.id)}>
              {savedRemedies.includes(remedy.id) ? <BookmarkCheck className="text-primary" /> : <BookmarkPlus />}
            </Button>
          </div>
          <p className="text-sm text-gray-600">{remedy.description}</p>
        </CardHeader>
        <CardContent className="pt-4">
          <h4 className="font-medium text-sm">Ingredients:</h4>
          <ul className="text-sm list-disc pl-5">{remedy.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
          <h4 className="font-medium text-sm mt-3">Instructions:</h4>
          <p className="text-sm">{remedy.instructions}</p>
          <h4 className="font-medium text-sm mt-3">Dosage:</h4>
          <p className="text-sm">{remedy.dosage}</p>
        </CardContent>
      </Card>
    </motion.div>
  );

  const categoryDescriptions = {
    pcos: { bg: "bg-purple-100", text: "Remedies to support PCOS management." },
    period: { bg: "bg-pink-100", text: "Relief for menstrual discomfort." },
    hormones: { bg: "bg-green-100", text: "Support for hormonal balance." },
    wellness: { bg: "bg-blue-100", text: "General health & wellness remedies." }
  };

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <motion.div {...fadeInUp}>
        <h1 className="text-2xl font-bold mb-2">Ayurvedic Remedies</h1>
        <p className="text-gray-600 mb-6">Natural solutions for your well-being.</p>
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input placeholder="Search remedies..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </motion.div>

      {searchTerm ? (
        <div>
          <h2 className="text-lg font-semibold">Search Results</h2>
          {filteredRemedies.length ? filteredRemedies.map(renderRemedyCard) : <p className="text-center py-8 text-gray-500">No remedies found.</p>}
        </div>
      ) : (
        <Tabs defaultValue="pcos">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="pcos">PCOS</TabsTrigger>
            <TabsTrigger value="period">Period</TabsTrigger>
            <TabsTrigger value="hormones">Hormones</TabsTrigger>
            <TabsTrigger value="wellness">Wellness</TabsTrigger>
          </TabsList>

          {Object.entries(remediesData).map(([category, remedies]) => (
            <TabsContent key={category} value={category}>
              <div className={`flex items-center ${categoryDescriptions[category as keyof typeof categoryDescriptions].bg} p-3 rounded-lg mb-4`}>
                <Leaf className="h-5 w-5 text-primary mr-3" />
                <p className="text-sm">{categoryDescriptions[category as keyof typeof categoryDescriptions].text}</p>
              </div>
              {remedies.map(renderRemedyCard)}
            </TabsContent>
          ))}

          {savedRemedies.length > 0 && (
            <TabsContent value="favorites">
              <h2 className="text-lg font-semibold mb-4 flex items-center"><Heart className="text-red-500 mr-2" /> Favorites</h2>
              {allRemedies.filter((remedy) => savedRemedies.includes(remedy.id)).map(renderRemedyCard)}
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );
};

export default Remedies;
