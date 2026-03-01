"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

import { sendEmailSubmission } from "@/lib/api/send-email";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "Nome deve conter pelo menos 2 caracteres." }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido." }),
  empresa: z.string().min(2, { message: "O nome da empresa é obrigatório." }),
  tipoServico: z.string().min(1, { message: "Selecione um tipo de serviço." }),
  mensagem: z
    .string()
    .min(10, { message: "A mensagem deve conter pelo menos 10 caracteres." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      empresa: "",
      tipoServico: "",
      mensagem: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await sendEmailSubmission(
        { ...values, formType: "Contato Simples" },
        `Novo Contato: ${values.nome} - ${values.empresa}`,
      );
      toast.success("Mensagem enviada com sucesso!", {
        description: "Entraremos em contato em breve.",
      });
      form.reset();
    } catch (error) {
      toast.error("Erro ao enviar a mensagem.", {
        description:
          "Por favor, tente novamente mais tarde ou contate-nos diretamente.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 py-20">
      <div className="w-full max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Conte-nos sobre o seu projeto
          </h1>
          <p className="text-muted-foreground text-lg">
            Preencha o formulário abaixo e nossa equipe entrará em contato para
            discutir as melhores soluções para sua empresa.
          </p>
        </div>

        <div className="border border-border/10 bg-white/[0.02] p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Seu nome"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail Corporativo</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seuemail@empresa.com"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="empresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Empresa</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Sua empresa"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tipoServico"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviço de Interesse</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Selecione um serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="landing-page">
                            Landing Page de Alta Conversão
                          </SelectItem>
                          <SelectItem value="trafego">
                            Gestão de Tráfego Pago
                          </SelectItem>
                          <SelectItem value="social-media">
                            Social Media (Posicionamento)
                          </SelectItem>
                          <SelectItem value="ia-criativos">
                            Criação de Criativos com IA
                          </SelectItem>
                          <SelectItem value="consultoria">
                            Consultoria Estratégica
                          </SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mensagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem / Como deseja o serviço?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Quais os principais desafios que sua empresa quer resolver hoje?"
                        className="min-h-[120px] bg-background resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full text-md h-12 mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Enviando
                  </>
                ) : (
                  <>
                    Enviar Solicitação
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
