import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SearchIcon, Leaf, BookmarkPlus, BookmarkCheck, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

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
    { id: 1, title: "Cinnamon Tea", description: "Helps balance blood sugar levels.", ingredients: ["1 cinnamon stick", "1 cup water"], instructions: "Boil for 10 min.", dosage: "1-2 cups daily" },
    { id: 2, title: "Fenugreek Seeds", description: "Regulates cycles & insulin.", ingredients: ["1 tbsp fenugreek seeds", "1 cup water"], instructions: "Soak overnight, consume.", dosage: "Daily for 3 months" }
  ],
  period: [
    { id: 3, title: "Ginger Tea", description: "Reduces cramps and inflammation.", ingredients: ["1-inch fresh ginger", "1 cup water"], instructions: "Boil 5-10 min.", dosage: "2-3 cups during menstruation" }
  ],
  hormones: [
    { id: 4, title: "Ashwagandha", description: "Balances hormones and reduces stress.", ingredients: ["1/2 tsp ashwagandha powder", "1 cup warm milk"], instructions: "Mix and drink.", dosage: "Before bedtime" }
  ],
  wellness: [
    { id: 5, title: "Lemon Honey Water", description: "Boosts digestion and detox.", ingredients: ["1 cup warm water", "1/2 lemon", "1 tsp honey"], instructions: "Mix well.", dosage: "Morning on an empty stomach" },
    { id: 6, title: "Chamomile Tea", description: "Promotes relaxation and sleep.", ingredients: ["1 chamomile tea bag", "1 cup hot water"], instructions: "Steep for 5 min.", dosage: "Before bedtime" }
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
