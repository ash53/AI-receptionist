'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { automatedReceptionistTraining } from '@/ai/flows/automated-receptionist-training';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const exampleLogs = `Chat Log 1:
User: Do you have weekend appointments?
AI: We are open from 9 AM to 5 PM, Monday to Friday.
---
Chat Log 2:
User: What's the price for a haircut?
AI: I'm sorry, I didn't quite understand that. Could you please rephrase?
`;

export default function AITrainingPage() {
  const [chatLogs, setChatLogs] = useState(exampleLogs);
  const [trainingResult, setTrainingResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTraining = async () => {
    if (!chatLogs.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Chat logs cannot be empty.',
      });
      return;
    }
    
    setIsLoading(true);
    setTrainingResult('');
    try {
      const result = await automatedReceptionistTraining({ chatLogs });
      setTrainingResult(result.trainingResult);
      toast({
        title: 'Training Analysis Complete',
        description: 'AI has provided improvement suggestions.',
      });
    } catch (error) {
      console.error('Training failed:', error);
      toast({
        variant: 'destructive',
        title: 'Training Failed',
        description: 'An error occurred during the training process.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Automated Receptionist Training</CardTitle>
          <CardDescription>
            Analyze past chat logs to improve the AI's performance. Paste chat logs below and click "Start Training".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chat-logs">Chat Logs for Training</Label>
            <Textarea
              id="chat-logs"
              placeholder="Paste chat logs here..."
              value={chatLogs}
              onChange={(e) => setChatLogs(e.target.value)}
              rows={10}
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleTraining} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Start Training Analysis'
            )}
          </Button>
        </CardContent>
      </Card>
      
      {trainingResult && (
        <Card>
          <CardHeader>
            <CardTitle>Training Results & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 font-code text-sm">
              {trainingResult}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
