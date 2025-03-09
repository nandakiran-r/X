import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MotherAndChildren = () => {
  const navigate = useNavigate();

  return (
    <div className="container px-4 py-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-3xl font-bold mb-4">Mother & Children</h1>
        <p className="text-muted-foreground mb-6">
          Ayurveda offers gentle, natural, and holistic approaches to support
          the health of mothers and children. Learn how Ayurveda can benefit you
          and your family.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="space-y-6"
      >
        {/* Ayurveda for Mothers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ayurveda for Mothers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Ayurveda provides safe and effective practices to support mothers
                during pregnancy, postpartum, and beyond. It emphasizes balance,
                nourishment, and mindfulness to ensure the well-being of both
                mother and child.
              </p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>
                  <strong>Diet & Nutrition:</strong> Ayurveda recommends a
                  balanced diet rich in whole grains, fresh fruits, vegetables,
                  and dairy to nourish the mother and support overall health.
                </li>
                <li>
                  <strong>Herbal Remedies:</strong> Safe herbs like Shatavari
                  and Ashwagandha can help maintain hormonal balance, boost
                  energy, and reduce stress.
                </li>
                <li>
                  <strong>Yoga & Meditation:</strong> Gentle yoga and meditation
                  can improve circulation, reduce stress, and promote emotional
                  well-being.
                </li>
                <li>
                  <strong>Daily Routines:</strong> Ayurveda encourages regular
                  sleep patterns, oil massages, and mindfulness practices to
                  promote relaxation and vitality.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Always consult with a qualified Ayurvedic practitioner before
                starting any new regimen, especially during pregnancy or
                postpartum.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ayurveda for Children */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Ayurveda for Children</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Ayurveda is gentle and safe for children, offering natural
                solutions to support their growth, immunity, and overall
                well-being.
              </p>
              <ul className="list-disc list-inside text-muted-foreground">
                <li>
                  <strong>Balanced Diet:</strong> Ayurveda emphasizes fresh,
                  seasonal, and easily digestible foods to support a child's
                  growth and development.
                </li>
                <li>
                  <strong>Herbal Supplements:</strong> Herbs like Tulsi (Holy
                  Basil), Amla (Indian Gooseberry), and Guduchi can boost
                  immunity and improve overall health.
                </li>
                <li>
                  <strong>Daily Routines:</strong> Establishing a consistent
                  daily routine, including regular sleep, play, and meal times,
                  helps maintain balance and discipline.
                </li>
                <li>
                  <strong>Massage & Oil Therapy:</strong> Regular oil massages
                  with warm sesame or coconut oil can strengthen muscles, improve
                  circulation, and promote relaxation.
                </li>
                <li>
                  <strong>Mindfulness:</strong> Simple breathing exercises and
                  mindfulness practices can help children develop focus and
                  emotional resilience.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Ayurveda for children should always be tailored to their unique
                needs and constitution. Consult an Ayurvedic practitioner for
                personalized guidance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-sakhi-mint/30 border-sakhi-mint">
          <CardHeader>
            <CardTitle className="text-xl">Learn More</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Explore Ayurvedic practices and remedies tailored for mothers and
              children's health. Start your journey toward holistic well-being
              today.
            </p>
            <Button
              onClick={() => navigate("/resources")}
              className="bg-sakhi-pink hover:bg-sakhi-pink/90 text-secondary-foreground"
            >
              Explore Resources
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MotherAndChildren;