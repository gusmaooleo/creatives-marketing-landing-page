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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const servicesEnum = z.enum([
  "landing_page",
  "trafego_pago",
  "social_media",
  "criacao_ia",
]);

const formSchema = z
  .object({
    // Base fields
    nome: z.string().min(2, "Nome deve conter pelo menos 2 caracteres."),
    email: z.string().email("Endereço de e-mail inválido."),
    empresa: z.string().min(2, "Nome da empresa é obrigatório."),
    whatsapp: z
      .string()
      .min(10, "Informe um número de telefone/WhatsApp válido."),

    // Services Checkbox group
    servicos: z.array(servicesEnum).min(1, "Selecione pelo menos um serviço."),

    // Dynamic Landing Page Fields
    lpComplexidade: z.string().optional(),
    lpElementos: z.string().optional(),
    lpCoresRefs: z.string().optional(),

    // Dynamic Social Media Fields
    smNicho: z.string().optional(),
    smFrequencia: z.string().optional(),
    smObjetivos: z.string().optional(),

    // Dynamic Tráfego Pago Fields
    tpOrcamento: z.string().optional(),
    tpPublico: z.string().optional(),
    tpPlataformas: z.string().optional(),

    // Dynamic Criação IA Fields
    iaTipoMedia: z.string().optional(),
    iaTomDeVoz: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Validate Landing Page fields
    if (data.servicos.includes("landing_page")) {
      if (!data.lpComplexidade || data.lpComplexidade.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Este campo é obrigatório para Landing Pages.",
          path: ["lpComplexidade"],
        });
      }
    }

    // Validate Social Media fields
    if (data.servicos.includes("social_media")) {
      if (!data.smNicho || data.smNicho.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o nicho de atuação.",
          path: ["smNicho"],
        });
      }
      if (!data.smFrequencia || data.smFrequencia.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Selecione a frequência desejada.",
          path: ["smFrequencia"],
        });
      }
    }

    // Validate Tráfego Pago fields
    if (data.servicos.includes("trafego_pago")) {
      if (!data.tpOrcamento || data.tpOrcamento.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o orçamento estimado.",
          path: ["tpOrcamento"],
        });
      }
    }

    // Validate Criação IA fields
    if (data.servicos.includes("criacao_ia")) {
      if (!data.iaTipoMedia || data.iaTipoMedia.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Informe o tipo de mídia.",
          path: ["iaTipoMedia"],
        });
      }
    }
  });

type FormValues = z.infer<typeof formSchema>;

const servicosOptions = [
  { id: "landing_page", label: "Landing Page" },
  { id: "trafego_pago", label: "Tráfego Pago" },
  { id: "social_media", label: "Social Media" },
  { id: "criacao_ia", label: "Criação com IA" },
] as const;

export default function OrcamentoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      empresa: "",
      whatsapp: "",
      servicos: [],
      lpComplexidade: "",
      lpElementos: "",
      lpCoresRefs: "",
      smNicho: "",
      smFrequencia: "",
      smObjetivos: "",
      tpOrcamento: "",
      tpPublico: "",
      tpPlataformas: "",
      iaTipoMedia: "",
      iaTomDeVoz: "",
    },
  });

  const selectedServicos = form.watch("servicos");

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    // Clean up unselected service data before sending to keep email clean
    const cleanData: Record<string, any> = {
      formType: "Orçamento Complexo",
      nome: values.nome,
      email: values.email,
      empresa: values.empresa,
      whatsapp: values.whatsapp,
      servicosSelecionados: values.servicos,
    };

    if (values.servicos.includes("landing_page")) {
      cleanData.landingPage = {
        complexidade: values.lpComplexidade,
        elementosObrigatorios: values.lpElementos,
        referencias: values.lpCoresRefs,
      };
    }
    if (values.servicos.includes("social_media")) {
      cleanData.socialMedia = {
        nicho: values.smNicho,
        frequencia: values.smFrequencia,
        objetivos: values.smObjetivos,
      };
    }
    if (values.servicos.includes("trafego_pago")) {
      cleanData.trafegoPago = {
        orcamentoMensal: values.tpOrcamento,
        publicoAlvo: values.tpPublico,
        plataformas: values.tpPlataformas,
      };
    }
    if (values.servicos.includes("criacao_ia")) {
      cleanData.criacaoIA = {
        tipoMedia: values.iaTipoMedia,
        tomDeVoz: values.iaTomDeVoz,
      };
    }

    try {
      await sendEmailSubmission(
        cleanData,
        `Solicitação de Orçamento: ${values.nome} - ${values.empresa}`,
      );
      toast.success("Orçamento solicitado com sucesso!", {
        description: "Em breve um de nossos especialistas entrará em contato.",
      });
      form.reset();
    } catch (error) {
      toast.error("Erro ao enviar a solicitação.", {
        description: "Tente novamente ou envie um e-mail diretamente.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 py-20">
      <div className="w-full max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Solicite um Orçamento Personalizado
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Precisamos entender os detalhes do seu projeto para apresentar a
            proposta ideal. Selecione os serviços desejados para detalhar suas
            necessidades.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            {/* Seção 1: Dados Básicos */}
            <div className="border border-border/10 bg-white/[0.02] p-8 rounded-2xl shadow-lg backdrop-blur-sm space-y-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                  1
                </span>
                Seus Dados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo*</FormLabel>
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
                      <FormLabel>E-mail Corporativo*</FormLabel>
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
                <FormField
                  control={form.control}
                  name="empresa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sua Empresa*</FormLabel>
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
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp / Telefone*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(00) 00000-0000"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Seção 2: Serviços */}
            <div className="border border-border/10 bg-white/[0.02] p-8 rounded-2xl shadow-lg backdrop-blur-sm">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                  2
                </span>
                Quais soluções você procura?
              </h2>
              <FormField
                control={form.control}
                name="servicos"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {servicosOptions.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="servicos"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-border/20 p-4 transition-colors hover:bg-white/[0.04] cursor-pointer"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    className="data-[state=checked]:bg-primary mt-1"
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer w-full text-base">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage className="mt-4" />
                  </FormItem>
                )}
              />
            </div>

            {/* Seção 3: Detalhamento Dinâmico */}
            {selectedServicos.length > 0 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-semibold flex items-center px-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                    3
                  </span>
                  Detalhes dos Serviços
                </h2>

                {/* Sub-form Landing Page */}
                {selectedServicos.includes("landing_page") && (
                  <div className="border-l-2 border-primary/50 bg-white/[0.02] p-6 lg:p-8 rounded-r-2xl shadow-sm space-y-6">
                    <h3 className="text-xl font-medium tracking-tight">
                      Landing Page
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <FormField
                        control={form.control}
                        name="lpComplexidade"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nível de Complexidade*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-background max-w-md">
                                  <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="simples">
                                  Simples (Captura de Leads)
                                </SelectItem>
                                <SelectItem value="business">
                                  Business (Página de Vendas completa)
                                </SelectItem>
                                <SelectItem value="enterprise">
                                  Enterprise (Múltiplas páginas/Customizada)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lpElementos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Elementos Obrigatórios</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: Formulário no topo, contador regressivo, etc."
                                className="bg-background resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lpCoresRefs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Referências e Concorrentes</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Cole os links de sites que você gosta como inspiração."
                                className="bg-background resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Sub-form Social Media */}
                {selectedServicos.includes("social_media") && (
                  <div className="border-l-2 border-[#8b5cf6]/50 bg-white/[0.02] p-6 lg:p-8 rounded-r-2xl shadow-sm space-y-6">
                    <h3 className="text-xl font-medium tracking-tight">
                      Social Media
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="smNicho"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nicho de Atuação*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: Odontologia, Moda..."
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
                        name="smFrequencia"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Frequência Desejada*</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-background">
                                  <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="3x">3x na semana</SelectItem>
                                <SelectItem value="5x">5x na semana</SelectItem>
                                <SelectItem value="diario">
                                  Todos os dias
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="smObjetivos"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Objetivos Principais</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ex: Aumentar engajamento, vender mais pelos stories..."
                                className="bg-background resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Sub-form Tráfego Pago */}
                {selectedServicos.includes("trafego_pago") && (
                  <div className="border-l-2 border-[#10b981]/50 bg-white/[0.02] p-6 lg:p-8 rounded-r-2xl shadow-sm space-y-6">
                    <h3 className="text-xl font-medium tracking-tight">
                      Gestão de Tráfego Pago
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="tpOrcamento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Orçamento Mensal (Mídia)*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="R$ 5.000,00"
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
                        name="tpPlataformas"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plataformas de Interesse</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: Meta, Google Ads, TikTok"
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
                        name="tpPublico"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Definição de Público-Alvo</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Quem é o cliente ideal do seu negócio?"
                                className="bg-background resize-y"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}

                {/* Sub-form Criação com IA */}
                {selectedServicos.includes("criacao_ia") && (
                  <div className="border-l-2 border-[#f59e0b]/50 bg-white/[0.02] p-6 lg:p-8 rounded-r-2xl shadow-sm space-y-6">
                    <h3 className="text-xl font-medium tracking-tight">
                      Criação com IA
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="iaTipoMedia"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Mídia Principal*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: Imagens Hiper-realistas, Vídeos com Avatar..."
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
                        name="iaTomDeVoz"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tom de Voz da Marca</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Ex: Sóbrio e corporativo, ou jovem e descontraído"
                                className="bg-background"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto h-14 px-10 text-lg sticky bottom-6 shadow-2xl z-10 mx-auto block"
              disabled={isSubmitting || selectedServicos.length === 0}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Processando...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Finalizar Orçamento
                  <Send className="ml-3 h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
